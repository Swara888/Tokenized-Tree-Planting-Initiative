// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TokenizedTree {
    uint256 public totalTrees;
    
    event TreePlanted(address indexed by, uint256 total);

    function plantTree() public {
        totalTrees++;
        emit TreePlanted(msg.sender, totalTrees);
    }
}
