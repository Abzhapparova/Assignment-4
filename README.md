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

## 2. Marketplace Contract (AiModelMarketplace.sol)

### Core Functions

function listModel(
  string memory name,
  string memory description,
  uint256 price,
  string memory fileLink
) external {}

function purchaseModel(uint256 modelId) external {}

function rateModel(uint256 modelId, uint8 rating) external {}  
## Setup and Installation 🚀

### Prerequisites

-   Node.js v18+
    
-   MetaMask (configured for Holesky testnet)
    
-   Alchemy API key (for deployment)
    

### Step-by-Step Guide

1.  Clone repository:
    
    bash
    
    Copy
    
    git clone https://github.com/yourusername/ai-model-marketplace.git
    cd ai-model-marketplace
    
2.  Install dependencies:
    
    bash
    
    Copy
    
    npm install
    cd frontend && npm install
    
3.  Configure environment:  
    Create  `.env`  file:
    
    env
    
    Copy
    
    ALCHEMY_API_KEY="your_alchemy_key"
    PRIVATE_KEY="your_wallet_private_key"
    
4.  Deploy contracts:
    
    bash
    
    Copy
    
    npx hardhat run scripts/deploy.js --network holesky
    
5.  Start frontend:
    
    bash
    
    Copy
    
    cd frontend
    npm start
    

----------

## Usage 🛠️

### For Sellers 🧑💼

1.  Connect wallet
    
2.  Navigate to "List Model"
    
3.  Fill details:
    
    markdown
    
    Copy
    
    Name: Ai
    Description: Model
    Price: 500 
    Link: ipfs://QmXyZ...
    
4.  Confirm transaction (≈ 142,300 gas)
    

### For Buyers 👨💼

1.  Browse available models
    
2.  Approve token spending:
    
    javascript
    
    Copy
    
    await tokenContract.approve(marketplaceAddress, price);
    
3.  Purchase model
    
4.  Rate after purchase:  
    ![Screenshot 2025-02-13 205248](frontend/public/screenshots/Скриншот%202025-02-13%20205248.png)
    

----------

## Screenshots 📸

### Wallet Connection

![Screenshot 2025-02-13 200837](frontend/public/screenshots/Скриншот%202025-02-13%200837.png)

### Model Listing

javascript

Copy

// Example of listed model
{
  id: 3,
  name: "Image Classifier v2.1",
  price: "1200 ASTK",
  rating: "4.6 ★"
}
![My Screenshot](frontend/public/screenshots/screenshot-2025-02-13-2936.png)



### Transaction Flow

![Screenshot 2025-02-13 212844](frontend/public/screenshots/Скриншот%202025-02-13%212844.png)

### Sold model 
![Screenshot 2025-02-13 212908](ai-model-marketplace/frontend/public/screenshots/Скриншот%202025-02-13%212908.png) 


----------

## Contributing 🤝

1.  Fork the repository
    
2.  Create feature branch:
    
    bash
    
    Copy
    
    git checkout -b feature/new-auction-system
    
3.  Commit changes:
    
    bash
    
    Copy
    
    git commit -m "Add Dutch auction functionality"
    
4.  Push to branch:
    
    bash
    
    Copy
    
    git push origin feature/new-auction-system
    
5.  Open Pull Request
    

----------

## License 📄

This project is licensed under the  **MIT License**  

----------

**Built with ❤️ by [Abzhapparova Gulnaz. SE-2331] 
