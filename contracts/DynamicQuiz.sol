// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Counter is AutomationCompatibleInterface, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 public counter;
    enum Level {
        Beginner,
        Intermediate,
        Advanced
    }

    mapping(uint256 => bool) isUpgradeEligibale;

    mapping(uint256 => Level) public level;

    bool upgrade = false;
    string[] IpfsURI = [
        "https://gateway.pinata.cloud/ipfs/Qmae7cKarVsqJx3bDq13u5WA5bSzDrbTWccibYbVtaHK1B",
        "https://gateway.pinata.cloud/ipfs/QmdX2UzJeW4MwvHv5FZoaoit4EjDaqa37yhdd9mW6KHqPw",
        "https://gateway.pinata.cloud/ipfs/QmZSDT3HgJHuEdJquePxtcwVh6c57Kbcm36MqHfyM7E4Db"
    ];
    uint256 public immutable interval;
    uint256 public lastTimeStamp;

    constructor(uint256 updateInterval) ERC721("P", "N") {
        interval = updateInterval;
        lastTimeStamp = block.timestamp;

        counter = 0;
    }

    function upgradeNFT() public onlyOwner {
        if (upgrade == false) {
            upgrade = true;
        } else {
            upgrade = false;
        }
    }

    function safeMint(address to, uint256 tokenId) public {
        _tokenIds.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, IpfsURI[0]);
    }

    function checkUpkeep(bytes calldata)
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory)
    {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
    }

    function performUpkeep(bytes calldata) external override {}

    function completed(address to) public {
        _tokenIds.increment();
        uint256 id = _tokenIds.current();
        _safeMint(to, id);
        _setTokenURI(0, IpfsURI[0]);
        setLevel(Level.Beginner, id);
    }

    function setLevel(Level _level, uint256 _nftId) internal {
        level[_nftId] = Level(_level);
    }

    function upgradeEligiblity(uint256 tokenId) public onlyOwner {
        Level l = level[tokenId];

        if (l == Level.Beginner) {
            isUpgradeEligibale[tokenId] = true;
            return;
        } else {
            if (l == Level.Intermediate) {
                isUpgradeEligibale[tokenId] = true;
                return;
            }
        }
        require(false, "Allready at Max");
    }
}
