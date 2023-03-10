<template>
  <div class="home">
    <h1>Safe with Approved Addresses</h1>
    <v-btn
      color="green"
      @click="initializeProviderAndSigner()"
    >
      Connect
    </v-btn>
    <p>{{ this.greeting }}</p>
    <v-btn
      color="green"
      @click="getGreeting()"
    >
      Get Greeting
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  data: () => ({
    greeting: ""
  }),
  computed: mapGetters(['contract']),
  methods: {
    ...mapActions(['initializeProviderAndSigner']),
    async getGreeting() {
       this.greeting = await this.contract.greet()
    },
  }
}
</script>
