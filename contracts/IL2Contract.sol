//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IL2Contract {
    function setGreeting(string memory _greeting, address from) external;
}
