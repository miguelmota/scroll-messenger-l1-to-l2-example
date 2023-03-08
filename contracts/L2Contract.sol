//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./IScrollMessenger.sol";

contract L2Contract {
    string private greeting;
    address l1Contract;
    address l2Messenger;

    constructor(address _l1Contract, address _l2Messenger) {
      l1Contract = _l1Contract;
      l2Messenger = _l2Messenger;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        require(msg.sender == l2Messenger);
        require(l1Contract == IScrollMessenger(l2Messenger).xDomainMessageSender());
        greeting = _greeting;
    }
}
