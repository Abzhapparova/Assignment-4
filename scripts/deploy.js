async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Деплой токена
  const Token = await ethers.getContractFactory("AstanaITAbzhapparovaGSE2331Token");
  const token = await Token.deploy();
  await token.waitForDeployment();
  console.log("Token deployed at:", token.target);

  // Деплой маркетплейса, передавая адрес токена
  const Marketplace = await ethers.getContractFactory("AiModelMarketplace");
  const marketplace = await Marketplace.deploy(token.target);
  await marketplace.waitForDeployment();
  console.log("Marketplace deployed at:", marketplace.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
