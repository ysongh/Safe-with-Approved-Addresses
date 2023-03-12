pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AddressApprove {
    address public owner;

    mapping(address => bool) public isAddressApprove;

    constructor(address _owner) {
        owner = _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    modifier onlyApprove() {
        require(isAddressApprove[msg.sender], "You are not approved");
        _;
    }

    function getETHBalance() public view returns (uint) {
        return address(this).balance;
    }

    function approveAddress(address _to) external onlyOwner {
        isAddressApprove[_to] = true;
    }

    function revokeAddress(address _to) external onlyOwner {
        isAddressApprove[_to] = false;
    }

    function withdrawTokenfromSafe(uint _tokenAmount, address _tokenAddress) external onlyApprove {
        IERC20 token = IERC20(_tokenAddress);
        require(token.transfer(owner, _tokenAmount), "Unable to transfer");    
    }

    function withdrawETH() external onlyApprove {
        payable(msg.sender).transfer(address(this).balance);
    }
}