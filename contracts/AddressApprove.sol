pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AddressApprove {
    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }

    function getETHBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withdrawTokenfromSafe(uint _tokenAmount, address _tokenAddress) public {
        IERC20 token = IERC20(_tokenAddress);
        require(token.transfer(owner, _tokenAmount), "Unable to transfer");    
    }
}