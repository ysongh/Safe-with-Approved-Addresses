<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    
    <router-link :to="{ path: '/'}" class="nav-link">
      Safe AA
    </router-link>

    <router-link :to="{ path: '/'}" class="nav-link">
      Home
    </router-link>

    <router-link :to="{ path: '/about'}" class="nav-link">
      About
    </router-link>

    <v-spacer></v-spacer>

    <v-btn
      v-if="!loading"
      color="green"
       @click="initializeProviderAndSigner()"
    >
      {{ formatWalletAddress(walletAddress) }}
    </v-btn>

    <v-btn
      v-else
      color="green"
      disabled
    >
      Loading...
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Navbar",
  data: () => ({
    loading: false
  }),
  computed: mapGetters(['walletAddress']),
  methods: {
    ...mapActions(['initializeProviderAndSigner']),
    formatWalletAddress(address) {
      if(address) return address.slice(0, 5) + "..." + address.slice(37, 42)
      else return "Connect Wallet"
    },
  }
}
</script>

<style>
  .nav-link {
    text-decoration: none;
    font-size: 1.2rem;
    margin-left: 1rem;
    margin-right: 1rem;
    color: #fff !important;
  }
  
  .nav-link:hover {
    color: rgb(184, 193, 203) !important;
  }
</style>