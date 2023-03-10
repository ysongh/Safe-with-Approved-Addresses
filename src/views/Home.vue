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

    <v-text-field
      class="mt-5"
      v-model="text"
      label="New Greeting"
      outlined
      dense
      clearable
    ></v-text-field>

     <v-btn
      color="green"
      @click="changeGreeting()"
    >
      Change Greeting
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  data: () => ({
    greeting: "",
    text: ""
  }),
  computed: mapGetters(['contract']),
  methods: {
    ...mapActions(['initializeProviderAndSigner']),
    async getGreeting() {
       this.greeting = await this.contract.greet()
    },
    async changeGreeting() {
      try {
          const txHandle = await this.contract.setGreeting(this.text);

          // Wait until the transaction is committed
          await txHandle.wait();

          // Update greeting
          this.greeting = await this.contract.greet();
      } catch (e) {
          alert(JSON.stringify(e));
      }
    },
  }
}
</script>
