import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    count: 0,
    lastUpdatedBy: ''
  },
  mutations: {
    SET_USER (state, payload) {
      state.user = payload
    },
    SET_COUNT (state, payload) {
      state.count = payload
    },
    SET_LAST_UPDATED(state, payload) {
      state.lastUpdatedBy = payload
    }
  },
  actions: {
    googleSignIn({commit}) {
      commit('SET_LOADING', true)
      let user = null
      let provider = new firebase.auth.GoogleAuthProvider()
      //https://developers.google.com/identity/protocols/googlescopes#oauth2v2
      provider.addScope("https://www.googleapis.com/auth/userinfo.email")
      provider.addScope("https://www.googleapis.com/auth/userinfo.profile")
      firebase.auth().signInWithPopup(provider)
      .then(googleData => {
        user = googleData.user
        const googleUser = {
          uid: user.uid, 
          displayName: user.displayName, 
          email: user.email,
          photoURL: user.photoURL,
          created: user.metadata.creationTime,
          lastSignIn: user.metadata.lastSignInTime,
        }
        firebase.database().ref('users').child(user.uid).set(googleUser)
        commit('SET_USER', googleUser)
      })
      .catch(error => console.log(error))
    },
    incrementCount({commit}, payload) {
      firebase.firestore().collection("game").doc("turn").set(payload)
      .then(() => {
          console.log("db updated")
      })
      .catch(function(error) {
          console.error("Error writing document: ", error)
      })
    },
    firestoreListener({commit}, getters) {
      firebase.firestore().collection('game').doc('turn')
      .onSnapshot(snapshot => {
        // console.log("Current data: ", snapshot.data())
        commit('SET_LAST_UPDATED', snapshot.data().currentUser)
        commit('SET_COUNT', snapshot.data().count)
        if(snapshot.data().count > 9) {
          alert("Count > 9 resetting game to 0")
        }
      })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    count (state) {
      return state.count
    },
    lastUpdatedBy(state) {
      return state.lastUpdatedBy
    }
  }
})
