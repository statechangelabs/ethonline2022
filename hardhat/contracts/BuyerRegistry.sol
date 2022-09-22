// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@polydocs/contracts/contracts/termsable/TermsableNoToken.sol";

// buyer has to be on registry to make a request and put money in escrow
// acceptedTerms
// mapping of users is they signed
contract BuyerRegistry is TermsableNoToken {
    struct TermsInfo {
        string key;
        string value;
    }

    function setPolydocs(
        string memory renderer,
        string memory template,
        TermsInfo[] memory terms
    ) public onlyMetaSigner {
        _setGlobalRenderer(renderer);

        _setGlobalTemplate(template);

        for (uint256 i = 0; i < terms.length; i++) {
            _setGlobalTerm(terms[i].key, terms[i].value);
        }
    }
}
