pragma solidity ^0.4.16;


import "./Owned.sol";


contract Shop is Owned {
  bytes32 public store_name; // store name
  uint256 private store_balance;  // store balance

  mapping (uint256 => Product) products;

  uint256[] productIds;

  //store events
  event ProductRegistered(uint256 productId);

  event ProductRegistrationFailed(uint256 productId);

  struct Product {
  uint256 id;
  bytes32 name;
  bytes32 description;
  uint256 price;
  uint256 default_amount;
  }


  function registerProduct(uint256 id, bytes32 name, bytes32 description,
  uint256 price, uint256 default_amount)
  onlyOwner public returns (bool success) {
    var product = Product(id, name, description, price, default_amount);
    //if (checkProductValidity(product)) {
    productIds.push(id);
    products[id] = product;
    ProductRegistered(id);
    return true;
    // }
    ProductRegistrationFailed(id);
    return false;
  }

  function getStoreBalance() public view returns (uint256) {
    return store_balance;
  }

  /*function checkProductValidity(Product product) private view
  returns (bool valid) {
    return (product.price > 0);
  }*/

  function getProduct(uint256 id) public view returns (bytes32 name,
  bytes32 description,
  uint256 price,
  uint256 default_amount) {
    return (products[id].name,
    products[id].description,
    products[id].price,
    products[id].default_amount);
  }

  function getProductIds() constant public returns (uint256[] memory product_ids) {
    return productIds;
  }
}
