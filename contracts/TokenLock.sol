// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "./Token.sol";

contract TokenLock {
    struct LockDetails {
        uint256 amount;
        address owneraddress;
        uint256 unlocktime;
        address tokenaddress;
    }

    mapping(address => LockDetails[]) public userDetails;
    uint256 public num = 5;

    //userDetail[] public userDetails;

    function lockToken(
        uint256 _amount,
        address _owneraddress,
        uint256 _unlocktime,
        address _tokenaddress
    ) public {
        //Token(_tokenaddress).transfer(address(this), _amount);
        userDetails[msg.sender].push(
            LockDetails({
                amount: _amount,
                owneraddress: _owneraddress,
                unlocktime: block.timestamp + _unlocktime,
                tokenaddress: _tokenaddress
            })
        );
    }

    function withdrawToken(uint256 _amount, address _tokenaddress) public {
        LockDetails[] memory arr = userDetails[msg.sender];
        for (uint256 i = 0; i < arr.length; i++) {
            if (arr[i].tokenaddress == _tokenaddress) {
                require(
                    arr[i].unlocktime <= block.timestamp,
                    "Locking Period is not Over Yet"
                );
                require(
                    arr[i].amount >= _amount,
                    "Insufficient amount of tokens"
                );

                /*LockDetails[] memory arr = userDetails[msg.sender];
                for (uint256 i = 0; i < arr.length; i++) {
                    Token(arr[i].tokenaddress).transfer(msg.sender, _amount);
                }*/
                Token(arr[i].tokenaddress).transfer(msg.sender, _amount);
            }
        }
    }

    function getMapping() public view returns (LockDetails[] memory) {
        return userDetails[msg.sender];
    }
}
