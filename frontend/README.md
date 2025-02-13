# AI Model Marketplace

AI Model Marketplace is a decentralized application (dApp) that allows users to list, purchase, and rate AI models. The application is built on Ethereum smart contracts and uses React.js for the frontend.

---

## 🔧 Features

### 📝 Main Functions:
- **Listing AI Models**: Users can add models with a name, description, and price.
- **Purchasing Models**: Models can be purchased by paying their listed price.
- **Rating Models**: After purchase, users can rate models, affecting their overall rating.
- **Viewing Information**: Access detailed information about a model.
- **Withdrawing Funds**: Model creators can withdraw their earned funds.

---

## 🛠️ Technologies

- **Frontend**: React.js, ethers.js, Web3Modal
- **Backend (Smart Contracts)**: Solidity
- **Local Testing Network**: Ganache
- **Development Tools**: Hardhat

---

## 🚀 Installation and Running the Project

### 📦 Step 1: Clone the Repository
```bash
git clone https://github.com/your_username/ai-model-marketplace.git
cd ai-model-marketplace
🛠️ Step 2: Install Dependencies
Install dependencies for the backend:

bash
npm install
Install dependencies for the frontend:

bash
cd frontend
npm install
cd ..
🔧 Step 3: Set Up Environment
Create a .env file in the root of the project and add the following:

PRIVATE_KEY_1=YOUR_GANACHE_PRIVATE_KEY
GOERLI_URL=Your_RPC_URL (e.g., https://goerli.infura.io/v3/YOUR-PROJECT-ID)
Ensure your network (e.g., Ganache) is running.

📜 Step 4: Deploy the Smart Contract
Run the deployment script:

bash
npx hardhat run scripts/deploy.js --network ganache
After deployment, record the contract address and add it to frontend/src/abi.js in the CONTRACT_ADDRESS field.

🖥️ Step 5: Run the Application
Navigate to the frontend folder:

bash
cd frontend
npm start
Open your browser and go to: http://localhost:3000

💻 Application Interface
Main functions:

Connect MetaMask: Button to connect the wallet.

List Model: Form to add a new model.

View Models: List of available models with "Buy" and "Rate" buttons.

📸 Screenshots
![Скриншот](images/Снимок%20экрана%202025-01-10%20221605.png)
![Скриншот](images/Снимок%20экрана%202025-01-10%20221619.png)
![Скриншот](images/Снимок%20экрана%202025-01-10%20221629.png)
![Скриншот](images/Снимок%20экрана%202025-01-10%20221639.png)
![Скриншот](images/Снимок%20экрана%202025-01-10%20222206.png)
📜 License
This project is licensed under the MIT License.

