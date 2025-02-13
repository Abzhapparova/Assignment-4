import React, { useState } from "react";
import { ethers } from "ethers";
import {
  TOKEN_ABI,
  TOKEN_ADDRESS,
  MARKETPLACE_ABI,
  MARKETPLACE_ADDRESS
} from "./config";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [tokenBalance, setTokenBalance] = useState("0");
  const [tokenContract, setTokenContract] = useState(null);
  const [marketplaceContract, setMarketplaceContract] = useState(null);
  const [ratingValue, setRatingValue] = useState(""); // Добавляем состояние для рейтинга
  // Форма для создания модели
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    fileLink: ""
  });

  // Список моделей
  const [models, setModels] = useState([]);

  // Подключение кошелька
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not found!");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      setAccount(userAddress);

      // Инициализация контрактов
      const tokenCont = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
      setTokenContract(tokenCont);

      const marketCont = new ethers.Contract(
        MARKETPLACE_ADDRESS,
        MARKETPLACE_ABI,
        signer
      );
      setMarketplaceContract(marketCont);

      // Получаем баланс токенов
      const decimals = await tokenCont.decimals();
      const balance = await tokenCont.balanceOf(userAddress);
      setTokenBalance(ethers.formatUnits(balance, decimals));

      // Загружаем список моделей (если есть)
      fetchModels(marketCont);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Загрузка списка моделей из контракта
  const fetchModels = async (marketCont) => {
    try {
      // totalModels() вернёт количество моделей
      const count = await marketCont.totalModels();
      const total = Number(count);

      const tempModels = [];
      for (let i = 0; i < total; i++) {
        try {
          const model = await marketCont.models(i);
          console.log("Model data:", model); // логируем для отладки
          const averageRating =
            model.ratingCount > 0
              ? Number(model.totalRating) / Number(model.ratingCount)
              : 0;

          tempModels.push({
            id: Number(model.id),
            name: model.name,
            description: model.description,
            price: ethers.formatUnits(model.price, 18),
            creator: model.creator,
            totalRating: Number(model.totalRating),
            ratingCount: Number(model.ratingCount),
            isSold: model.isSold,
            fileLink: model.fileLink,
            averageRating: averageRating
          });
        } catch (error) {
          console.error(`Error fetching model ${i}:`, error);
        }
      }
      setModels(tempModels);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  // Создание новой модели
  const listModel = async (e) => {
    e.preventDefault();
    if (!marketplaceContract) return;
    try {
      // Цена в токенах -> wei
      const priceInUnits = ethers.parseUnits(form.price, 18);

      const tx = await marketplaceContract.listModel(
        form.name,
        form.description,
        priceInUnits,
        form.fileLink
      );
      await tx.wait();
      alert("Model listed successfully!");

      // Обновляем список
      fetchModels(marketplaceContract);
    } catch (error) {
      console.error("Error listing model:", error);
      if (error.code === "ACTION_REJECTED") {
        alert("Transaction rejected by user.");
      } else {
        alert("Failed to list model. Check console for details.");
      }
    }
  };

  // Покупка модели
  const purchaseModel = async (id, price) => {
    if (!marketplaceContract || !tokenContract) return;
    try {
      const decimals = await tokenContract.decimals();
      const amount = ethers.parseUnits(price, decimals);
      // approve
      const approveTx = await tokenContract.approve(MARKETPLACE_ADDRESS, amount);
      await approveTx.wait();

      // purchase
      const tx = await marketplaceContract.purchaseModel(id);
      await tx.wait();
      alert("Model purchased successfully!");

      // Обновляем список
      fetchModels(marketplaceContract);

      // Обновляем баланс токенов
      const newBalance = await tokenContract.balanceOf(account);
      setTokenBalance(ethers.formatUnits(newBalance, decimals));
    } catch (error) {
      console.error("Error purchasing model:", error);
      if (error.code === "ACTION_REJECTED") {
        alert("Transaction rejected by user.");
      } else {
        alert("Failed to purchase model. Check console for details.");
      }
    }
  };

  const rateModel = async (id) => {
    if (!marketplaceContract) return;
    try {
      const rating = Number(ratingValue);  // Используем состояние ratingValue
      if (rating < 1 || rating > 5) {
        alert("Rating must be between 1 and 5");
        return;
      }
      
      const tx = await marketplaceContract.rateModel(id, rating);
      await tx.wait();
      alert(`Model rated with ${rating}!`);
      setRatingValue(""); // Сбрасываем значение после отправки
      fetchModels(marketplaceContract);
    } catch (error) {
      console.error("Error rating model:", error);
      alert("Failed to rate model. Check console for details.");
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>AI Model Marketplace</h1>
      </div>

      {!account ? (
        <button className="connect-button" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <div className="content">
          <div className="info-bar">
            <p>
              <strong>Address:</strong> {account}
            </p>
            <p>
              <strong>Token Balance:</strong> {tokenBalance}
            </p>
          </div>

          <div className="listing-form">
            <h2>Create a Model Listing</h2>
            <form onSubmit={listModel}>
              <input
                className="input-field"
                placeholder="Model Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                className="input-field"
                placeholder="Model Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
              <input
                className="input-field"
                placeholder="Price (in tokens)"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
              <input
                className="input-field"
                placeholder="File Link (URL)"
                value={form.fileLink}
                onChange={(e) => setForm({ ...form, fileLink: e.target.value })}
                required
              />
              <button type="submit" className="create-button">
                Create Listing
              </button>
            </form>
          </div>

          <div className="models-section">
            <h2>AI Models for Sale</h2>
            <div className="models-container">
              {models.map((model) => (
                <div className="model-card" key={model.id}>
                  <p><strong>Name:</strong> {model.name}</p>
                  <p><strong>Description:</strong> {model.description}</p>
                  <p><strong>Price:</strong> {model.price} tokens</p>
                  <p><strong>Seller:</strong> {model.creator}</p>
                  <p><strong>File Link:</strong> {model.fileLink}</p>
                  <p><strong>Average Rating:</strong> {model.averageRating.toFixed(1)} / 5</p>

                  {model.isSold ? (
                    <p className="sold-text">SOLD</p>
                  ) : (
                    model.creator.toLowerCase() !== account.toLowerCase() && (
                      <button
                        className="buy-button"
                        onClick={() => purchaseModel(model.id, model.price)}
                      >
                        Buy
                      </button>
                    )
                  )}

                  {/* Поле ввода и кнопка для рейтинга */}
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={ratingValue}
                    onChange={(e) => setRatingValue(e.target.value)}
                    placeholder="1-5"
                  />
                  <button
                    className="rate-button"
                    onClick={() => rateModel(model.id)}
                  >
                    Rate
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
