import Vue from 'vue'
import Vuex from 'vuex'

import { Contract, Web3Provider, Provider } from "zksync-web3";
import {} from "ethers";

import Greeter from '../../artifacts-zk/contracts/Greeter.sol/Greeter.json'

const GREETER_CONTRACT_ADDRESS = "0x981Bea14Eb3F1483e675A472D7C33e38243175e3";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contract: ""
  },
  getters: {
    contract: state => state.contract
  },
  mutations: {
    setContract: (state, contract) => (state.contract = contract)
  },
  actions: {
    async initializeProviderAndSigner({ commit }) {
      try{
        const provider = new Provider('https://zksync2-testnet.zksync.dev');

        // Note that we still need to get the Metamask signer
        const signer = (new Web3Provider(window.ethereum)).getSigner();
        const contract = new Contract(
            GREETER_CONTRACT_ADDRESS,
            Greeter.abi,
            signer
        );
        commit('setContract', contract)
        console.log(contract)
      } catch(error) {
        console.log(error)
      }
    }
  },
  modules: {
  }
})
