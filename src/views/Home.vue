<template>
  <v-container>
    <h1>
      Shareable Smart Wallet
    </h1>
    <p>
     Share your funds with your friends or family
    </p>
    <v-btn @click="connectWallet()">
      Connect Wallet
    </v-btn>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
 
export default {
  name: 'Home',
  methods: {
    ...mapActions(['initializeProviderAndSigner']),
    async connectWallet() {
      await this.initializeProviderAndSigner()
      this.$router.push('/dashboard')
    }
  }
}
</script>