//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./IL1ScrollMessenger.sol";
import "./IL2Contract.sol";

contract L1Contract {
    address l1Messenger;

    constructor(address _l1Messenger) {
      l1Messenger = _l1Messenger;
    }

    function sendMessageToL2(address _to, string memory _greeting) payable public {
      address _from = address(this);
      uint256 _gasLimit = 100000;
      bytes memory _message = abi.encodeWithSelector(
        IL2Contract.setGreeting.selector,
        _greeting,
        _from
      );

      IL1ScrollMessenger(l1Messenger).sendMessage{ value: msg.value }(_to, 0, _message, _gasLimit);
    }
}
