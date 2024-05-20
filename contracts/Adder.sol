// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Addition {
    uint256 public result;
    uint256 public Assia;

    // Function to add two numbers
    function add(uint256 a, uint256 b) public {
        result = a + b;
    }
    function getResult() public view returns (uint256) {
        return result;
    }
}
