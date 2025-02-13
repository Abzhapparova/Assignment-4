// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AstanaITAbzhapparovaGSE2331Token is Ownable, ERC20 {
    address public lastSender;
    address public lastReceiver;
    uint256 public lastTimestamp;

    event TransactionTracked(address indexed sender, address indexed receiver, uint256 timestamp);

    constructor() 
        Ownable(msg.sender) // Явный вызов конструктора Ownable
        ERC20("AstanaITAbzhapparovaGSE2331Token", "AITAGSE2331") 
    {
        _mint(msg.sender, 2000 * 10 ** decimals());
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        bool success = super.transfer(recipient, amount);
        if (success) {
            lastSender = msg.sender;
            lastReceiver = recipient;
            lastTimestamp = block.timestamp;
            emit TransactionTracked(msg.sender, recipient, lastTimestamp);
        }
        return success;
    }
}