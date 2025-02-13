export const TOKEN_ADDRESS = "0xf26211Cae97Ee649e4e0F2fEDde297bbAB7F9462";
export const MARKETPLACE_ADDRESS = "0x71573FCb189fA4D45f18d9d044277a35865e520F";

export const TOKEN_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function approve(address spender, uint256 amount) returns (bool)"
];

export const MARKETPLACE_ABI = [
  "function totalModels() view returns (uint256)",
  "function listModel(string name, string description, uint256 price, string fileLink)",
  "function purchaseModel(uint256 modelId)",
  "function rateModel(uint256 modelId, uint8 rating)",
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "models",
    "outputs": [
      {"internalType": "uint256", "name": "id", "type": "uint256"},
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "uint256", "name": "price", "type": "uint256"},
      {"internalType": "address", "name": "creator", "type": "address"},
      {"internalType": "uint256", "name": "totalRating", "type": "uint256"},
      {"internalType": "uint256", "name": "ratingCount", "type": "uint256"},
      {"internalType": "bool", "name": "isSold", "type": "bool"},
      {"internalType": "string", "name": "fileLink", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
