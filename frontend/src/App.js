import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./abi";
import "./App.css"; // Подключаем файл стилей

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [models, setModels] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "" });

  const connectWallet = async () => {
    const ethereum = window.ethereum;
    if (!ethereum) {
      alert("MetaMask not detected!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);

    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const newContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    setContract(newContract);
  };

  const fetchModels = async () => {
    try {
      const count = await contract.modelCount();
      const fetchedModels = [];

      for (let i = 0; i < count; i++) {
        const model = await contract.models(i);
        fetchedModels.push({
          id: i,
          name: model.name,
          description: model.description,
          price: ethers.formatEther(model.price),
          creator: model.creator,
        });
      }

      setModels(fetchedModels);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchModels();
    }
  }, [contract]);

  const listModel = async () => {
    const priceInEther = ethers.parseEther(form.price);
    const tx = await contract.listModel(form.name, form.description, priceInEther);
    await tx.wait();
    fetchModels();
  };

  const purchaseModel = async (id, price) => {
    const tx = await contract.purchaseModel(id, { value: ethers.parseEther(price) });
    await tx.wait();
    fetchModels();
  };

  const rateModel = async (id, rating) => {
    const tx = await contract.rateModel(id, rating);
    await tx.wait();
    fetchModels();
  };

  return (
    <div className="app-container">
      <h1>AI Model Marketplace</h1>
      {!account ? (
        <button className="connect-button" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <div>
          <p className="account-info">Connected account: {account}</p>

          <section className="form-section">
            <h2>List a New Model</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                listModel();
              }}
              className="model-form"
            >
              <input
                placeholder="Name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                placeholder="Description"
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
              <input
                placeholder="Price (ETH)"
                type="number"
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
              <button type="submit" className="list-button">
                List Model
              </button>
            </form>
          </section>

          <section className="models-section">
            <h2>Available Models</h2>
            <div className="models-container">
              {models.map((model) => (
                <div className="model-card" key={model.id}>
                  <p>
                    <strong>Name:</strong> {model.name}
                  </p>
                  <p>
                    <strong>Description:</strong> {model.description}
                  </p>
                  <p>
                    <strong>Price:</strong> {model.price} ETH
                  </p>
                  <p>
                    <strong>Creator:</strong> {model.creator}
                  </p>
                  {model.creator !== account && (
                    <button
                      className="buy-button"
                      onClick={() => purchaseModel(model.id, model.price)}
                    >
                      Buy
                    </button>
                  )}
                  <button
                    className="rate-button"
                    onClick={() => rateModel(model.id, 5)}
                  >
                    Rate 5
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
