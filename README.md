# AI Model Marketplace 🤖💼
A decentralized marketplace for buying and selling AI models using an ERC‑20 token.

Этот проект объединяет функциональность смарт-контракта ERC‑20 токена (Assignment 3) и маркетплейса AI моделей (Assignment 2) в единое решение.

## Table of Contents 📑
- [Overview](#overview-)
- [Features ✨](#features-)
- [Project Structure 📁](#project-structure-)
- [Smart Contracts 🔒](#smart-contracts-)
- [Frontend 🖥️](#frontend-)
- [Setup and Installation 🚀](#setup-and-installation-)
- [Usage 🛠️](#usage-)
- [Screenshots 📸](#screenshots-)
- [Contributing 🤝](#contributing-)
- [License 📄](#license-)

## Overview 📖
The AI Model Marketplace is a blockchain-based platform where users can securely trade AI models using a custom ERC‑20 token. Built on Ethereum (Holesky testnet), it combines:
- **ERC‑20 Token Standard** for payments
- **Decentralized Marketplace** for model transactions
- **React Frontend** with real-time updates

### Key Workflow 🔄
- **Sellers** list AI models with metadata (name, description, price, file link).
- **Buyers** purchase models using tokens after approving the marketplace contract.
- **Purchasers** rate models (1–5 stars), updating the on-chain average rating.

## Features ✨

### Core Functionality
- **Wallet Integration 🔗**  
  Connect MetaMask to interact with the blockchain.
- **Token Balance Display 💰**  
  View real-time ERC‑20 token balance.
- **Model Listings 📝**  
  - Displays name, description, price (in tokens) and file link (IPFS/URL)  
  - Automatic status update from "Available" to "Sold"
- **Secure Purchases 🔐**  
  Two-step process: token approval followed by transfer.
- **Rating System ⭐**  
  On-chain storage of ratings with average calculation.

### Advanced Capabilities
- **Immutable Records 🔒**  
  All transactions are securely stored on the blockchain.
- **Gas Optimization ⚡**  
  Efficient contract functions for cost-effective transactions.
- **Responsive UI 📱**  
  Dynamic updates using React and ethers.js.

## Project Structure 📁
ai-model-marketplace/
├── contracts/
│   ├── AiModelMarketplace.sol      # Marketplace logic
│   └── AstanaITAbzhapparovaGSE2331Token.sol  # ERC‑20 token
├── scripts/
│   └── deploy.js                   # Deployment script
├── frontend/
│   ├── public/                     # Static assets
│   │   └── screenshots/            # UI previews
│   └── src/
│       ├── components/             # React components
│       ├── App.js                  # Main application logic
│       └── config.js               # Contract addresses
├── hardhat.config.js               # Network configuration
└── README.md                       # Project documentation

## Smart Contracts 🔒

### 1. ERC‑20 Token (AstanaITAbzhapparovaGSE2331Token.sol)
```solidity
// Key Features:
// - Initial supply: 1,000,000 tokens
// - Mintable (for testing)
// - Transfer/approval functionality
// - Based on OpenZeppelin ERC20 
# AI Model Marketplace 

## 2. Marketplace Contract (AiModelMarketplace.sol)

### Core Functions

```solidity
function listModel(
  string memory name,
  string memory description,
  uint256 price,
  string memory fileLink
) external {}

function purchaseModel(uint256 modelId) external {}

function rateModel(uint256 modelId, uint8 rating) external {}

