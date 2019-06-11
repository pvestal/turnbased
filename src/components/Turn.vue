<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs12 >
                <v-card dark color="primary">
                <h1>Who Touched</h1>
                <p v-if="currentUser">Your UID:{{currentUser.uid}}</p>
                <p v-if="countState!= undefined">Count State: {{countState}}</p>
                <p v-if="currentUser">Last Updated By: {{lastUpdatedBy}}</p>
                </v-card>
                <v-btn block color="primary" v-if="currentUser" :disabled="currentUser.uid == lastUpdatedBy" @click="increment" dark>TOUCH</v-btn>
                <v-btn block color="primary" :disabled="isAuthenticated" @click="googleSignIn" dark>GOOGLE SIGNIN</v-btn>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
import format from 'date-fns/format'

    export default {
        data: () => ({

        }),
        computed: {
            countState () {
                return this.$store.getters.count
            },
            lastUpdatedBy () {
                return this.$store.getters.lastUpdatedBy
            },
            currentUser() {
                return this.$store.getters.user
            },
            isAuthenticated () {
                if (this.currentUser == undefined || this.currentUser == null) {
                  return false;
                } else {
                  return true;
                }
            }
        },
        methods: {
            increment() {
                let myObj = {
                    count: this.countState + 1,
                    currentUser: this.currentUser.uid,
                    updated: format(Date.now(), 'HH:mm:ss'),
                }
                this.$store.dispatch('incrementCount', myObj)
            },
            googleSignIn() {
                this.$store.dispatch('googleSignIn')
            },
        },
        created() {
            this.$store.dispatch('firestoreListener')
        }
    }
</script>

<style>

</style>
