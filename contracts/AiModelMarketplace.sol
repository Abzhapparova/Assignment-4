// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AiModelMarketplace {
    IERC20 public token;

    struct Model {
        uint256 id;
        string name;
        string description;
        uint256 price;
        address creator;
        uint256 totalRating;
        uint256 ratingCount;
        bool isSold;
        string fileLink;
    }

    Model[] public models;

    event ModelListed(uint256 modelId, string name, uint256 price, address creator, string fileLink);
    event ModelPurchased(uint256 modelId, address buyer);
    event ModelRated(uint256 modelId, uint8 rating);

    /**
     * @notice Указываем адрес ERC20 токена. Не добавляем никаких демо-моделей.
     * @param _tokenAddress Адрес ERC-20 токена
     */
    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
        // БЕЗ демо-моделей
    }

    /**
     * @notice Листинг новой модели
     */
    function listModel(
        string memory name,
        string memory description,
        uint256 price,
        string memory fileLink
    ) external {
        require(price > 0, "Price must be greater than zero.");
        require(bytes(fileLink).length > 0, "File link is required.");

        uint256 newId = models.length;
        models.push(
            Model({
                id: newId,
                name: name,
                description: description,
                price: price,
                creator: msg.sender,
                totalRating: 0,
                ratingCount: 0,
                isSold: false,
                fileLink: fileLink
            })
        );

        emit ModelListed(newId, name, price, msg.sender, fileLink);
    }

    /**
     * @notice Покупка модели
     */
    function purchaseModel(uint256 modelId) external {
        require(modelId < models.length, "Model does not exist.");
        Model storage model = models[modelId];
        require(!model.isSold, "Model already sold.");
        require(model.creator != msg.sender, "Creator cannot buy their own model.");

        // Проверяем, есть ли у покупателя достаточно токенов
        require(token.balanceOf(msg.sender) >= model.price, "Insufficient token balance.");

        bool success = token.transferFrom(msg.sender, model.creator, model.price);
        require(success, "Token transfer failed.");

        model.isSold = true;
        emit ModelPurchased(modelId, msg.sender);
    }

    /**
     * @notice Оценка модели (1-5)
     */
    function rateModel(uint256 modelId, uint8 rating) external {
        require(modelId < models.length, "Model does not exist.");
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5.");

        Model storage model = models[modelId];
        model.totalRating += rating;
        model.ratingCount++;

        emit ModelRated(modelId, rating);
    }

    /**
     * @notice Получить количество моделей
     */
    function totalModels() external view returns (uint256) {
        return models.length;
    }

    /**
     * @notice Дополнительная функция для просмотра деталей модели (если нужно)
     */
    function getModelDetails(uint256 modelId)
        external
        view
        returns (
            string memory name,
            string memory description,
            uint256 price,
            address creator,
            uint256 averageRating,
            bool sold,
            string memory link
        )
    {
        require(modelId < models.length, "Model does not exist.");
        Model storage model = models[modelId];
        if (model.ratingCount > 0) {
            averageRating = (model.totalRating * 10) / model.ratingCount;
        } else {
            averageRating = 0;
        }
        return (
            model.name,
            model.description,
            model.price,
            model.creator,
            averageRating,
            model.isSold,
            model.fileLink
        );
    }
}
