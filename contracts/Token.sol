// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./TokenLock.sol";

contract Token is ERC20 {
    constructor(uint256 initialSupply) ERC20("Dijkstra", "DT") {
        _mint(msg.sender, initialSupply);
    }

    /*function transferTokens(
        address to,
        uint256 amount,
        address tokenLockAddress
    ) public {
        transfer(to, amount);
        TokenLock(tokenLockAddress).lockToken(amount, 120, address(this));
    }*/
}

/*contract Token {
    string public name = "Adarsh Token";
    string public symbol = "AT";
    uint256 public totalSupply = 100000;

    address public owner;
    mapping(address => uint256) balance;

    constructor() {
        owner = msg.sender;
        balance[owner] = totalSupply;
    }

    function transfer(uint256 _amount, address _to) public {
        require(_amount <= balance[msg.sender], "Not Enough Tokens");
        balance[msg.sender] -= _amount;
        balance[_to] += _amount;
    }

    function balanceOf(address _account) public view returns (uint256) {
        return balance[_account];
    }
}*/
