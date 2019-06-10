<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vue+Vuetify+Firebase</span>
        <span class="font-weight-light">TURNBASED APP</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>

    <v-content>
      <Turn/>
    </v-content>
  </v-app>
</template>

<script>
import Turn from './components/Turn'

export default {
  name: 'App',
  components: {
    Turn
  },
  data () {
    return {
      //
    }
  }
}
</script>
