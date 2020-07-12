pragma solidity ^0.6.0;

contract SimpleStorage {
    uint storedData;

    function set(uint data) public {
        storedData = data;
    }

    function get() public view returns(uint data) {
        return storedData;
    }

}
