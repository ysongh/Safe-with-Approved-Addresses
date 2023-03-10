<template>
  <v-app>
    
    <Navbar />

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

import Navbar from './components/layout/Navbar.vue'

export default Vue.extend({
  name: 'App',

  components: {
    Navbar
  },

  data: () => ({
    //
  }),
});
</script>
