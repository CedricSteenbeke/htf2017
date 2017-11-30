pragma solidity ^0.4.16;


contract Shop {
  bytes32 public store_name; // store name
  uint256 private store_balance;  // store balance

  mapping (uint256 => Product) products;

  struct Product {
    uint256 id;
    bytes32 name;
    bytes32 description;
    uint256 price;
    uint256 default_amount;
  }
}
