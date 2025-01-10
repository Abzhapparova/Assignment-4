// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AiModelMarketplace {
    struct Model {
        string name; // Имя модели
        string description; // Описание модели
        uint256 price; // Цена модели в ETH
        address payable creator; // Адрес создателя модели
        uint256 ratingSum; // Сумма всех рейтингов модели
        uint256 ratingCount; // Количество оценок модели
    }

    // Список моделей
    mapping(uint256 => Model) public models;
    uint256 public modelCount;

    // Список покупок
    mapping(address => mapping(uint256 => bool)) public purchasedModels;

    // События
    event ModelListed(uint256 modelId, string name, uint256 price, address creator);
    event ModelPurchased(uint256 modelId, address buyer);
    event ModelRated(uint256 modelId, uint8 rating, address rater);

    // Функция для добавления новой модели
    function listModel(
        string memory name,
        string memory description,
        uint256 price
    ) external {
        require(price > 0, "Price must be greater than 0");

        models[modelCount] = Model({
            name: name,
            description: description,
            price: price,
            creator: payable(msg.sender),
            ratingSum: 0,
            ratingCount: 0
        });

        emit ModelListed(modelCount, name, price, msg.sender);
        modelCount++;
    }

    // Функция для покупки модели
    function purchaseModel(uint256 modelId) external payable {
        Model storage model = models[modelId];
        require(model.creator != address(0), "Model does not exist");
        require(msg.value == model.price, "Incorrect value sent");
        require(!purchasedModels[msg.sender][modelId], "Already purchased");

        purchasedModels[msg.sender][modelId] = true;
        model.creator.transfer(msg.value);

        emit ModelPurchased(modelId, msg.sender);
    }

    // Функция для оценки модели
    function rateModel(uint256 modelId, uint8 rating) external {
        require(purchasedModels[msg.sender][modelId], "You have not purchased this model");
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");

        Model storage model = models[modelId];
        model.ratingSum += rating;
        model.ratingCount++;

        emit ModelRated(modelId, rating, msg.sender);
    }

    // Функция для получения деталей модели
    function getModelDetails(uint256 modelId)
        external
        view
        returns (
            string memory,
            string memory,
            uint256,
            address,
            uint256
        )
    {
        Model storage model = models[modelId];
        require(model.creator != address(0), "Model does not exist");

        uint256 averageRating = model.ratingCount > 0
            ? model.ratingSum / model.ratingCount
            : 0;

        return (model.name, model.description, model.price, model.creator, averageRating);
    }
}
// This is a test comment for recompilation
