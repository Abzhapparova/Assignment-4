# AI Model Marketplace 🤖💼

A decentralized marketplace for buying and selling AI models using an ERC‑20 token. This project combines an ERC‑20 token contract with an AI model marketplace contract to provide a complete on-chain solution.

---

## Table of Contents 📑

- [Overview](#overview-)
- [Features ✨](#features-)
- [Project Structure 📁](#project-structure-)
- [Smart Contracts 🔒](#smart-contracts-)
- [Frontend 🖥️](#frontend-)
- [Setup and Installation 🚀](#setup-and-installation-)
- [Usage 🛠️](#usage-)
- [Screenshots 📸](#screenshots-)
- [Pushing to GitHub with VS Code 💾](#pushing-to-github-with-vs-code-)
- [License 📄](#license-)

---

## Overview 📖

The **AI Model Marketplace** is a decentralized application that allows users to:
- Connect their MetaMask wallet.
- View their ERC‑20 token balance.
- Create new AI model listings by entering the model name, description, price (in tokens), and a file link.
- Purchase models using ERC‑20 tokens (the purchase process uses an approval flow and then transfers tokens).
- Rate models after purchase, with the average rating displayed on each model card.

All data is stored on-chain, ensuring transparency and trust in the marketplace.

---

## Features ✨

- **Wallet Integration:** Connect your MetaMask wallet to interact with the blockchain.
- **Token Balance Display:** View your ERC‑20 token balance immediately upon connection.
- **Create Model Listings:** Sellers can list models by providing:
  - Model Name
  - Model Description
  - Price (in tokens)
  - File Link (URL or IPFS link)
- **Purchase Flow:** Buyers can purchase models, which transfers tokens from the buyer to the seller. Purchased models are marked as **SOLD**.
- **Rating System:** Rate models on a scale of 1 to 5. Each rating updates the on-chain average rating for the model.
- **Real-time Updates:** After each transaction (listing, purchase, rating), the frontend fetches the latest on-chain data and updates the UI accordingly.

---

## Project Structure 📁

ai-model-marketplace/ ├── contracts/ │ ├── AiModelMarketplace.sol // Marketplace smart contract │ └── AstanaITAbzhapparovaGSE2331Token.sol // ERC‑20 token contract ├── scripts/ │ └── deploy.js // Deployment script for contracts ├── frontend/ │ ├── package.json // React project dependencies │ ├── public/ │ │ └── screenshots/ // Folder with screenshots │ └── src/ │ ├── App.js // Main React component │ ├── App.css // Styling for the app │ └── config.js // Contract addresses and ABI ├── hardhat.config.js // Hardhat configuration └── README.md // This file

yaml
Копировать
Редактировать

---

## Smart Contracts 🔒

### ERC‑20 Token Contract

- **AstanaITAbzhapparovaGSE2331Token.sol** mints an initial supply and allows token transfers.
- This token is used for payments in the marketplace.

### AI Model Marketplace Contract

- **AiModelMarketplace.sol** provides:
  - `listModel(string name, string description, uint256 price, string fileLink)`: Lists a new model.
  - `purchaseModel(uint256 modelId)`: Allows a buyer to purchase a model (transfers tokens and marks the model as sold).
  - `rateModel(uint256 modelId, uint8 rating)`: Enables rating of a purchased model. The contract stores the total rating and the number of ratings, allowing calculation of an average rating.
  - Getter functions like `totalModels()` and `models(uint256)` to retrieve on-chain data.

---

## Frontend 🖥️

The frontend is built with React and ethers.js. It offers:
- **Wallet Connection:** A button to connect your MetaMask wallet.
- **Token Balance Display:** Your ERC‑20 token balance is shown after connection.
- **Model Listing Form:** A form to create new model listings with fields for name, description, price, and file link.
- **Dynamic Model Cards:** Displays each model’s details including name, description, price, seller address, file link, and average rating. If the model is unsold and you are not the seller, a **Buy** button appears; if sold, it shows **SOLD**.
- **Rating Functionality:** Each model card includes an input field (or buttons) to select a rating (1–5) and a **Rate** button to submit the rating.

---

## Setup and Installation 🚀

1. **Clone the repository:**

   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd ai-model-marketplace
Install backend dependencies:

bash
Копировать
Редактировать
npm install
Compile Contracts:

bash
Копировать
Редактировать
npx hardhat compile
Deploy Contracts:

Update your hardhat.config.js with your network details (e.g., Holesky via Alchemy) and run:

bash
Копировать
Редактировать
npx hardhat run scripts/deploy.js --network holesky
Update Frontend Configuration:

In frontend/src/config.js, update TOKEN_ADDRESS and MARKETPLACE_ADDRESS with the deployed contract addresses.

Setup and Run the Frontend:

Navigate to the frontend directory, install dependencies, and start the app:

bash
Копировать
Редактировать
cd frontend
npm install
npm start
The app will be available at http://localhost:3000.

Usage 🛠️
Connect Wallet:
Click the Connect Wallet button and confirm the connection in MetaMask.

View Token Balance:
Your wallet address and ERC‑20 token balance are displayed.

Create a Model Listing:

Fill in the form with the model's Name, Description, Price (in tokens), and File Link (URL or IPFS).
Click Create Listing and confirm the transaction in MetaMask.
The new model will then appear in the model list.
Purchase a Model:

If you are not the seller and the model is unsold, click Buy.
Confirm the token approval and purchase transactions in MetaMask.
The model will be marked as SOLD after purchase.
Rate a Model:

For each model, enter a rating (1–5) in the input field and click Rate.
The contract updates the model’s total rating and rating count, and the average rating is calculated and displayed.
Screenshots 📸
Place your screenshots in the frontend/public/screenshots/ folder. Then reference them in this README:



Pushing to GitHub with VS Code 💾
Open your project in Visual Studio Code.

Open the Source Control panel (the Git icon on the left sidebar).

Initialize Git (if not already):

bash
Копировать
Редактировать
git init
git add .
git commit -m "Initial commit for AI Model Marketplace"
Create a new repository on GitHub:
Go to GitHub, click New repository, name it (e.g., ai-model-marketplace), and create it.

Link the local repository to GitHub:

bash
Копировать
Редактировать
git remote add origin https://github.com/<YOUR_USERNAME>/ai-model-marketplace.git
Push your changes:

bash
Копировать
Редактировать
git push -u origin main
Alternatively, use VS Code’s built-in Source Control GUI to commit and push changes.

License 📄
This project is licensed under the MIT License. See the LICENSE file for details.

Happy Coding! 🚀✨

css
Копировать
Редактировать

Этот README.md содержит подробное описание проекта, его функциональности и шаги по установке, 
