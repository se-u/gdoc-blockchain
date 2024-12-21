import React, { useState, useEffect } from "react";
import Web3 from "web3";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your contract address
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "MessagePosted",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getLatestMessage",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "latestMessage",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "postMessage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sender",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const App: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string>("");
  const [contract, setContract] = useState<string>(null);
  const [message, setMessage] = useState<string>("");
  const [latestMessage, setLatestMessage] = useState<string>("");
  const [latestSender, setLatestSender] = useState<string>("");

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);

        const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
        setWeb3(web3Instance);
        setContract(contractInstance);
      } else {
        alert("Please install MetaMask!");
      }
    };

    initWeb3();
  }, []);

  const postMessage = async () => {
    if (contract && web3 && message.trim()) {
      await contract.methods
        .postMessage(message)
        .send({ from: account });
      alert("Message posted successfully!");
      setMessage("");
    } else {
      alert("Please enter a message.");
    }
  };

  const fetchLatestMessage = async () => {
    if (contract) {
      const res = await contract.methods.getLatestMessage().call();
      setLatestMessage(res[0]);
      setLatestSender(res[1]);
      
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Message DApp</h1>
      <div>
        <h3>Post a Message</h3>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          style={{ width: "300px", marginRight: "10px" }}
        />
        <button onClick={postMessage}>Post Message</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Latest Message</h3>
        <button onClick={fetchLatestMessage}>Get Latest Message</button>
        <p>
          <strong>Message:</strong> {latestMessage || "N/A"}
        </p>
        <p>
          <strong>Sender:</strong> {latestSender || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default App;
