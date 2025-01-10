const hre = require("hardhat");

async function main() {
    // Получаем контракт для деплоя
    const AiModelMarketplace = await hre.ethers.getContractFactory("AiModelMarketplace");
    const aiMarketplace = await AiModelMarketplace.deploy();

    await aiMarketplace.deployed();

    console.log("AiModelMarketplace deployed to:", aiMarketplace.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
