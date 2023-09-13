// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract GamesFactory {
address[] public gamesAddr;

function createGame(uint _bet, uint _playersLimit) external payable{
    gamesAddr.push(address(new Game{value: msg.value}(msg.sender, _bet, _playersLimit)));
}
}

contract Game {
    uint public playersLimit;
    mapping (address => bool) public inGame;

    uint public bidSize;
    uint [] public bets;
    address [] public players;

    mapping (address => bool) public pendingWithdraws;
    mapping (address => bool) public failedWithdraws;

    uint constant public GAME_DURATION = 120;
    uint constant public BET_RANGE = 20;
    uint public finishTime;
    uint public prizePool;
    uint public prizePerWinner;
    uint public luckyNumber;
    uint public numberOfWinners;
    bool private locked;
    
    event GotWinner(address _name, uint _bet, uint _diff);
    event StopFor(uint _winnersNumb, uint _i);
    event WithdrawFail(address _addr, uint _prize);
    event WithdrawSuccess(address _addr, uint _prize);
    event GameStarted(uint _bidSize, uint _playersLimit, uint _finishTime);


    constructor (address _gameStarter, uint _bet, uint _playersLimit) payable {
        require(msg.value > 0, "Bid must be greater than 0");
        require(_bet <= BET_RANGE, "Bet must be from 0 to 20");
        playersLimit = _playersLimit;
        bidSize = msg.value;
        finishTime = block.timestamp + GAME_DURATION;
        players.push(_gameStarter);
        bets.push(_bet);
        inGame[_gameStarter] = true;
        prizePool = msg.value;
        locked = false;
        emit GameStarted(bidSize, playersLimit, finishTime);
    }

    modifier gameIsFinished {
        require(block.timestamp >= finishTime, "Game is not finished");
        _;
    }

    modifier reentrancyGuard {
        require (!locked, "Function is locked");
        _;
        locked = true;
    }
    
        function getPlayersNumber () external view returns (uint) {
        return players.length;
    }
    
    function makeBet (uint _bet) public payable {
        require(block.timestamp < finishTime, "Game is finished");
        require(playersLimit != players.length, "Players limit is reached");
        require(!inGame[msg.sender], "You've already made a bet");
        require(msg.value == bidSize, "Wrong bid amount");
        require(_bet <= BET_RANGE, "Bet must be from 0 to 20");
       
        players.push(msg.sender);
        bets.push(_bet);
        inGame[msg.sender] = true;
        prizePool += msg.value;
    }

    function getLuckyNumber (uint _modulus) internal view gameIsFinished returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, players[1]))) % _modulus;
    }

    function calcDiff (uint _numA, uint _numB, uint _targetDiff) internal pure returns (bool) {
        if (_numA >= _numB) {
            return (_targetDiff == (_numA - _numB));
        } else {
            return (_targetDiff == (_numB - _numA));
        }
    }

    function getWinners () public gameIsFinished reentrancyGuard() {
        uint _winners = 0;
        // If game has only one player
        if (players.length == 1) {
            pendingWithdraws[players[0]] = true;
            prizePerWinner = prizePool;
            emit GotWinner(players[0], bets[0], 111);
        } 
        // If game has more than one player
        else {
            luckyNumber = getLuckyNumber(BET_RANGE);
            if (players.length/3 < 1) {
                numberOfWinners = 1;
            } else {
                numberOfWinners = players.length/3;
            }
            for (uint i = 0; i < BET_RANGE; i++) {
                for (uint j = 0; j < bets.length; j++) {
                    if(calcDiff(luckyNumber, bets[j], i)) {
                        ++_winners;
                        pendingWithdraws[players[j]] = true;
                        emit GotWinner(players[j], bets[j], i);
                    }
                }
                if(_winners >= numberOfWinners) {
                    emit StopFor(_winners, i);
                    break;
                    }
            }
            prizePerWinner = prizePool/_winners;
            }       
    }

    function withdraw () public payable gameIsFinished {
        require(address(this).balance >= prizePerWinner, "Not enough money on the contract");
        require(pendingWithdraws[msg.sender], "Nothing to withdraw");
        pendingWithdraws[msg.sender] = false;
        (bool success, ) = msg.sender.call{value: prizePerWinner}("");
        if (!success) {
            failedWithdraws[msg.sender] = true;
            emit WithdrawFail(msg.sender, prizePerWinner);
        } else {
            failedWithdraws[msg.sender] = false;
            emit WithdrawSuccess(msg.sender, prizePerWinner);
        }
    }

    receive () external payable {
        revert("Your transaction is reverted");
    }
}
