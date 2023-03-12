<template>
  <div class="home">
    <h1>Dashboard</h1>
    <p>Your Safe Address {{ this.safeAddress }}</p>

    <v-btn
      v-if="safeAddress === '0x0000000000000000000000000000000000000000'"
      color="green"
      @click="createSafe()"
    >
      Create Safe
    </v-btn>

    <h2>Check Approve</h2>
    <v-text-field
      v-model="to"
      label="To"
      outlined
      dense
      clearable
    ></v-text-field>
    <v-btn
      color="green"
      @click="isAddressApprove()"
    >
      Check
    </v-btn>


    <h2 class="mt-3">Approve Address</h2>
    <v-text-field
      v-model="to"
      label="To"
      outlined
      dense
      clearable
    ></v-text-field>
    <v-btn
      color="green"
      @click="approveAddress()"
    >
      Approve
    </v-btn>

    <h2 class="mt-3">Withdraw DAI</h2>
    <v-text-field
      v-model="amount"
      label="Amount"
      outlined
      dense
      clearable
    ></v-text-field>
     <v-btn
      color="green"
      @click="depositToSafe()"
    >
      Deposit DAI
    </v-btn>
    <v-btn
      color="green"
      @click="withDrawToken()"
    >
      Withdraw DAI
    </v-btn>

    <br />
    <br />

    <v-btn
      color="green"
      @click="getETHBalance()"
    >
      Get DAI Balance
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { ethers } from "ethers"

const DAI = "0x3e7676937a7e96cfb7616f255b9ad9ff47363d4b"

export default {
  name: 'Dashboard',
  data: () => ({
    safeAddress: "",
    to: "",
    amount: ""
  }),
  computed: mapGetters(['contract', 'contract2', 'walletAddress', 'userSigner']),
  methods: {
    ...mapActions(['setSafeAddress']),
    async createSafe() {
      try {
          const txHandle = await this.contract.createSafe();

          // Wait until the transaction is committed
          await txHandle.wait();

          this.safeAddress = await this.contract.getSafeContract()
          this.setSafeAddress(this.safeAddress)
      } catch (e) {
          alert(JSON.stringify(e));
      }
    },
    async getETHBalance() {
       const balance = await this.contract2.getETHBalance()
       alert(balance);
    },
    async isAddressApprove() {
       const a = await this.contract2.isAddressApprove(this.to)
       alert(a);
    },
    async approveAddress() {
      try {
          const txHandle = await this.contract2.approveAddress(this.to);

          // Wait until the transaction is committed
          await txHandle.wait();
      } catch (e) {
          alert(JSON.stringify(e));
      }
    },
    async depositToSafe() {
      const transferHandle = await this.userSigner.transfer({
        to: this.safeAddress,
        token: DAI,
        amount: ethers.utils.parseEther(this.amount)
      });

      console.log(transferHandle);
    },
   async withDrawToken() {
      try {
          const txHandle = await this.contract2.withdrawTokenfromSafe(ethers.utils.parseEther(this.amount), DAI);

          // Wait until the transaction is committed
          await txHandle.wait();
      } catch (e) {
          alert(JSON.stringify(e));
      }
    },
  },
  async created() {
    try{
      this.safeAddress = await this.contract.getSafeContract()
      this.setSafeAddress(this.safeAddress)
    } catch(error) {
      console.log(error)
    }
  }
}
</script>
