import Vue from 'vue'
import Vuex from 'vuex'

import { Contract, Web3Provider, Provider } from "zksync-web3";
import { ethers } from "ethers";

import AAFactory from '../../artifacts-zk/contracts/AAFactory.sol/AAFactory.json'
import AddressApprove from '../../artifacts-zk/contracts/AddressApprove.sol/AddressApprove.json'

const AACONTRACT_ADDRESS = "0xb99e2174Af42ac9Cfad31dca5Bf9D9a8a8C5df68";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contract: "",
    contract2: "",
    walletAddress: "",
    userSigner: ""
  },
  getters: {
    contract: state => state.contract,
    contract2: state => state.contract2,
    walletAddress: state => state.walletAddress,
    userSigner: state => state.userSigner
  },
  mutations: {
    setContract: (state, contract) => (state.contract = contract),
    setContract2: (state, contract2) => (state.contract2 = contract2),
    setWalletAddress: (state, walletAddress) => (state.walletAddress = walletAddress),
    setUserSigner: (state, userSigner) => (state.userSigner = userSigner)
  },
  actions: {
    async initializeProviderAndSigner({ commit }) {
      try{
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const account = ethers.utils.getAddress(accounts[0])
        commit('setWalletAddress', account)

        const provider = new Provider('https://zksync2-testnet.zksync.dev');

        // Note that we still need to get the Metamask signer
        const signer = (new Web3Provider(window.ethereum)).getSigner();
        commit('setUserSigner', signer)

        const contract = new Contract(
            AACONTRACT_ADDRESS,
            AAFactory.abi,
            signer
        );
        commit('setContract', contract)
        console.log(contract)
      } catch(error) {
        console.log(error)
      }
    },
    async setSafeAddress({ commit }, contractAddress) {
      try{
        const provider = new Provider('https://zksync2-testnet.zksync.dev');

        // Note that we still need to get the Metamask signer
        const signer = (new Web3Provider(window.ethereum)).getSigner();
        const contract = new Contract(
            contractAddress,
            AddressApprove.abi,
            signer
        );
        commit('setContract2', contract)
        console.log(contract)
      } catch(error) {
        console.log(error)
      }
    }
  },
  modules: {
  }
})
