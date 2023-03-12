pragma solidity ^0.8.0;

import "./AddressApprove.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AAFactory {
    mapping(address => address) public addressToSafe;

    constructor() {}

    function createSafe() public {
        AddressApprove newSafe = new AddressApprove(msg.sender);
        addressToSafe[msg.sender] = address(newSafe);
    }

    function getSafeContract() public view returns (address) {
        return addressToSafe[msg.sender];
    }
}