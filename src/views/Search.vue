<template>
  <div class="home">
    <h1>Search</h1>

    <v-text-field
      v-model="address"
      label="Search for Safe"
      outlined
      dense
      clearable
    ></v-text-field>
    <v-btn
      color="green"
      @click="searchSafe()"
    >
      Check
    </v-btn>

    <div v-if="contract2">
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

        <h2 class="mt-3">{{ this.balance / 10 ** 18 }} DAI</h2>
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
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Provider } from "zksync-web3";
import { ethers } from "ethers"

const provider = new Provider('https://zksync2-testnet.zksync.dev');
const DAI = "0x3e7676937a7e96cfb7616f255b9ad9ff47363d4b"

export default {
  name: 'Search',
  data: () => ({
    address: "",
    to: "",
    amount: "",
    balance: ""
  }),
  computed: mapGetters(['contract', 'contract2', 'walletAddress', 'userSigner']),
  methods: {
    ...mapActions(['setSafeAddress']),
    async searchSafe() {
      try{
        this.setSafeAddress(this.address)
        const balanceInUnits = await provider.getBalance(this.address, "latest", DAI);
        this.balance = balanceInUnits
      } catch(error) {
        console.log(error)
      }
    },
    async isAddressApprove() {
       const a = await this.contract2.isAddressApprove(this.to)
       alert(a);
    },
    async depositToSafe() {
      const transferHandle = await this.userSigner.transfer({
        to: this.safeAddress,
        token: DAI,
        amount: ethers.utils.parseEther(this.amount)
      });

      console.log(transferHandle);

      const balanceInUnits = await provider.getBalance(this.address, "latest", DAI);
      this.balance = balanceInUnits
    },
    async withDrawToken() {
      try {
          const txHandle = await this.contract2.withdrawTokenfromSafe(ethers.utils.parseEther(this.amount), DAI);

          // Wait until the transaction is committed
          await txHandle.wait();

          const balanceInUnits = await provider.getBalance(this.address, "latest", DAI);
          this.balance = balanceInUnits
      } catch (e) {
          alert(JSON.stringify(e));
      }
    },
  }
}
</script>
