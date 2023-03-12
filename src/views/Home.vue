<template>
  <div class="home">
    <h1>Safe with Approved Addresses</h1>
    <v-btn
      color="green"
      @click="initializeProviderAndSigner()"
    >
      Connect
    </v-btn>
    <p>{{ this.safeAddress }}</p>

    <v-btn
      color="green"
      @click="getSafeAddress()"
    >
      Get Safe Address
    </v-btn>

    <v-btn
      color="green"
      @click="createSafe()"
    >
      Create Safe
    </v-btn>

    <br />
    <br />

    <v-btn
      color="green"
      @click="getETHBalance()"
    >
      Get ETH Balance
    </v-btn>

    <v-btn
      color="green"
      @click="isAddressApprove()"
    >
      isAddressApprove
    </v-btn>

     <v-btn
      color="green"
      @click="approveAddress()"
    >
      approveAddress
    </v-btn>

     <v-btn
      color="green"
      @click="withDrawETH()"
    >
      withDrawETH
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  data: () => ({
    safeAddress: "",
  }),
  computed: mapGetters(['contract', 'contract2', 'walletAddress']),
  methods: {
    ...mapActions(['initializeProviderAndSigner', 'setSafeAddress']),
    async getSafeAddress() {
       this.safeAddress = await this.contract.getSafeContract()
       this.setSafeAddress("")
    },
    async createSafe() {
      try {
          const txHandle = await this.contract.createSafe();

          // Wait until the transaction is committed
          await txHandle.wait();
      } catch (e) {
          alert(JSON.stringify(e));
      }
    },
    async getETHBalance() {
       const balance = await this.contract2.getETHBalance()
       alert(balance);
    },
    async isAddressApprove() {
       const a = await this.contract2.isAddressApprove(this.walletAddress)
       alert(a);
    },
    async approveAddress() {
      try {
          const txHandle = await this.contract2.approveAddress(this.walletAddress);

          // Wait until the transaction is committed
          await txHandle.wait();
      } catch (e) {
          alert(JSON.stringify(e));
      }
    },
   async withDrawETH() {
      try {
          const txHandle = await this.contract2.withdrawETH();

          // Wait until the transaction is committed
          await txHandle.wait();
      } catch (e) {
          alert(JSON.stringify(e));
      }
    },
  }
}
</script>
