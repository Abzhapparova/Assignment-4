require("@nomicfoundation/hardhat-toolbox"); 
require("@nomiclabs/hardhat-ethers"); // Для взаимодействия с контрактами
require("dotenv").config(); // Поддержка .env для безопасного хранения ключей

module.exports = {
    solidity: "0.8.19",  // Укажи ту же версию, что и в контракте
    networks: {
        localhost: {   // Для работы с Ganache
            url: "http://127.0.0.1:7545", 
        },

    }
};
