// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
import "./Token.sol";

contract TokenLock {
    struct Details {
        uint256 id;
        address tokenAddress;
        address owner;
        uint256 lockedTime;
        uint256 unlockTime;
        uint256 amount;
        bool withdrawed;
    }
    uint256 id = 0;
    uint256[] allIds;
    mapping(uint256 => Details) lockedTokens;
    mapping(address => uint256[]) depositor;
    mapping(address => uint256[]) tokenDetail;
    mapping(address => mapping(address => uint256)) myBalance;

    /**
     * @dev function Lock token in contract
     * @param _tokenAddress {address} address of token
     * @param _amount {uint256} amount of Token to lock
     * @param _unlockTime {uint256} unlock Time
     */
    function lockToken(
        address _tokenAddress,
        uint256 _amount,
        uint256 _unlockTime
    ) public {
        Token(_tokenAddress).transferFrom(msg.sender, address(this), _amount);

        lockedTokens[id].id = id;
        lockedTokens[id].tokenAddress = _tokenAddress;
        lockedTokens[id].owner = msg.sender;
        lockedTokens[id].lockedTime = block.timestamp;
        lockedTokens[id].unlockTime = block.timestamp + _unlockTime;
        lockedTokens[id].amount = _amount;
        lockedTokens[id].withdrawed = false;

        myBalance[msg.sender][_tokenAddress] += _amount;
        depositor[msg.sender].push(id);
        allIds.push(id);
        tokenDetail[_tokenAddress].push(id);
        id++;
    }

    /**
     * @dev function get balance of token
     * @param _tokenAddress {address} address of token
     * @return  token balance of contract
     */
    function tokenBalanceOf(address _tokenAddress)
        public
        view
        returns (uint256)
    {
        return Token(_tokenAddress).balanceOf(address(this));
    }

    /**
     * @dev function get token balance
     * @param _tokenAddress {address} address of token
     * @return tokenBalance of caller account
     */
    function myTokenBalance(address _tokenAddress)
        public
        view
        returns (uint256)
    {
        return myBalance[msg.sender][_tokenAddress];
    }

    /**
     * @dev function get locking details
     * @param _index {uint256} id of locked token
     * @return details of locked token
     */
    function getDetailsOf(uint256 _index) public view returns (Details memory) {
        return lockedTokens[_index];
    }

    /**
     * @dev function withdraw tokens
     * @param _id {uint256} id of locked token
     */
    function withDrawToken(uint256 _id) public {
        require(_id <= depositor[msg.sender].length, "Please Enter valid Id");
        require(
            msg.sender == lockedTokens[_id].owner,
            "You are not authorized for withdrawal"
        );
        require(
            block.timestamp >= lockedTokens[_id].unlockTime,
            "You can't withdraw token before unlocktime"
        );
        require(
            lockedTokens[_id].withdrawed == false,
            "You have already withdrawed tokens"
        );
        uint256 _amount = lockedTokens[_id].amount;
        address _tokenAddress = lockedTokens[_id].tokenAddress;
        Token(_tokenAddress).transfer(msg.sender, _amount);
        lockedTokens[_id].amount = 0;
        lockedTokens[_id].withdrawed = true;
    }

    /**
     * @dev function get all locked token ids
     * @return array of ids
     */
    function getAllIds() public view returns (uint256[] memory) {
        return allIds;
    }

    /**
     * @dev function get array Ids of Deposiors
     * @return array of ids
     */
    function myTransactions() public view returns (uint256[] memory) {
        return depositor[msg.sender];
    }
}
