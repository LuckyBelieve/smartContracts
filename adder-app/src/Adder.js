import React, { useState, useEffect } from "react";
import Web3 from "web3";
import AdderABI from "./Adder.json"; // Ensure this path is correct

const Adder = () => {
  const [account, setAccount] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);


  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });

          setWeb3(web3Instance);

          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          const contractAddress = "0x1FF2B38d91e10eFA8aBb28Fd84419576Cb6EDc42"; // Replace with your contract address
          const contractInstance = new web3Instance.eth.Contract(
            AdderABI.abi,
            contractAddress
          );
          setContract(contractInstance);
        } catch (error) {
          console.error("User denied account access", error);
        }
      } else {
        console.error(
          "No Ethereum browser extension detected. Install MetaMask!"
        );
      }
    };

    initWeb3();
  }, []);

  const handleAdd = async () => {
    if (contract && account && a !== "" && b !== "") {
      const valueA = parseInt(a, 10);
      const valueB = parseInt(b, 10);

      if (!isNaN(valueA) && !isNaN(valueB)) {
        try {
          await contract.methods.add(valueA, valueB).send({ from: account });
         const resultFromContract = await contract.methods.result().call({ from: account });
          console.log(parseInt(resultFromContract));
          setResult(parseInt(resultFromContract));
        } catch (error) {
          console.error("Error in transaction or fetching result:", error);
        }
      } else {
        console.error("Inputs must be valid numbers.");
      }
    } else {
      console.error("Please enter valid numbers.");
    }
  };

  return (
    <div className="mainContainer">
      <h1 className="header">sum calculator</h1>
      {/* <button onClick={connectWallet}>Connect Wallet</button> */}
      <div className="container">
        <input
          type="number"
          value={a}
          onChange={(e) => setA(e.target.value)}
          placeholder="Enter first number"
          className="input"
        />
        <input
          type="number"
          value={b}
          onChange={(e) => setB(e.target.value)}
          placeholder="Enter second number"
          className="input"
        />
        <button onClick={handleAdd} className="button">Add</button>
      </div>
      {result !== undefined && result !== "" && (
        <h2 className="header">Result: {result}</h2>
      )}
    </div>
  );
};

export default Adder;
