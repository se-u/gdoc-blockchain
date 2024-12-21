// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Message {
    string public latestMessage;
    address public sender;

    // Event to log when a message is posted
    event MessagePosted(string message,address indexed sender);

    // Function to post a new message
    function postMessage(string memory _message) public {
        latestMessage = _message;
        sender = msg.sender;
        emit MessagePosted(_message, sender);
    }

    // Function to get the latest message and the sender
    function getLatestMessage() public view returns (string memory, address) {
        return (latestMessage, sender);
    }
}
