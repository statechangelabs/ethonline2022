# Polygig Trustless freelance gig management

## Introduction

Stop paying 20% to the freelance platforms. Polygig provides trustless, escrowed freelance engagement management using the decentralized web.

A lot of companies - including in web3 -  are laying off full time staff, and gig employment is more important as an income source than ever before. Freelance work is harder because the employer and the potential contractor do not know each other, and have little basis for mutual trust. Small jobs - gigs - make building trust and reputation easier. But we still have the problems of making matches and managing the flow of work and money in these engagement between strangers.

Web2's approach has been to offer centralized intermediaries that facilitate communication, escrow and dispute management - in a word, they manage trust. The going rate for these platforms is one dollar in every five going to the intermediary. Even more, they have rules that prohibit participants from taking their relationship offline after a trust relationship has been built. Doing so could block a freelancer from using the platform again in the future. 

We believe that people own their own work, and they should be paid for it. Buyers should hire a freelancer without paying this hefty "tax" to the intermediary. Distributed ledgers replace the trusted intermediary. 

Polygig is a public protocol that manages secure communication, escrowing funds for a job, and managing disputes at only the cost of gas fees. Communications are secured using the encryption built into the wallets people have today. Escrow is automatic and uses USDC to remove currency risk - no arbitrary tokens required. People can focus on exchanging work for money without risk or friction.

The record of well-managed engagement builds up on the platform and is visible to all. When an engagement is completed and money has changed hands, the buyer and seller may review each other. These reviews are visible to the broader community, building reputation (positive or negative). If the seller does not want to be reviewed on this engagement, just issue a refund, and while the refund goes in the record, the review will not. 

Further, since people own their relatinoships, once trust is built, they might choose to use a system that doesn't require such an intermediary! If so, we wish them well. No more lock-in. 

Web3 is a better way to manage building trust between parties. Polygig brings that to the short-term labor market where it is needed most. 

Removing the 20% fees taken by intermediaries means a 25% increase in compensation for freelancers who could use the money in these frothy economic times. That's a good deal for all of us. 


## How It's Made
 
PolyGig runs at the intersection of decentralized ledgers and decentralized storage. 

We use [Polygon](https://polygon.network) as the ledger to store records of the work process, from bid to acceptance to delivery to (hopefully) payment, refund or (hopefully not) arbitration. The low gas fees let us model Vitalik Buterin's encouragement to build like gas fees were 1000x less. They are today - on Polygon! 

We use IPFS to store the secure messages, bid/offer information, and reviews to be stored for the longer term. We support client-side upload of these using UCAN tokens over [NFT.Storage](https://nft.storage) The front-end dapp itself is hosted on [IPFS](https://ipfs.io) using [Spheron](https://spheron.network)

We facilitate compliance and norms through requiring that prospective buyers and sellers have attested to their eligibility for these roles - such as a statement they will manage their tax responsiblities - using the [Polydocs](https://polydocs.xyz) protocol which this team built in a previous EthGlobal hackathon! 

We use the ledger to store clear evidence of who has asserted what and in order. The narrative information is stored on IPFS to be immutable and far lower cost Emitted events track sequence immutably. 