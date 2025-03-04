---
title: Understanding Jito Restaking
description: About Jito Restaking
date: 2025-02-26
author: Jito Contributor
tags:
  - guide
---

## Introduction

### Why Restaking Matters

In the rapidly evolving world of blockchain technology, securing networks has traditionally required participants to lock up significant capital through staking.
However, this approach creates an inherent tradeoff between network security and capital efficiency.
Jito's innovative Restaking protocol addresses this challenge by enabling already-staked assets to participate in multiple networks simultaneously, maximizing both security and utility.

Jito Restaking represents a significant advancement for the Solana ecosystem, providing a framework where tokens can be tokenized, delegated across different consensus networks, and managed with granular controls for security and performance.
This article breaks down the architecture, components, and potential of this groundbreaking system.

### About Restaking

Developers seeking to launch a new chain or application had to bootstrap their own validator sets and launch tokens to secure their protocols. Restaking leverages the economic security of existing networks to help deploy new applications and services, providing early-stage teams with stronger security assurances while enhancing stakers’ capital efficiency and returns.

At its core, restaking applies the principles of staking to additional applications, middleware, and chains. Today the concept primarily involves users staking their Liquid Staking Tokens (LSTs) to earn higher rewards by securing more services, hence the term “restaking”.

## Why Jito Developed Restaking

### Addressing Centralization in MEV Distribution

Jito has been working on MEV solutions on Solana. However, this system faced a centralization challenge that the move to restaking helps address.

#### The Previous Process with MEV Distribution

- Each validator has a unique tip distribution account, owned by the [Jito Tip Distribution Program], where SOL is collected for a given epoch.
  At the end of the epoch, an off-chain process takes place which produces a merkle tree and merkle root for each validator's tip distribution account.

- Validators can run this process themselves or delegate it to another party.
  The merkle tree is intended to distribute any SOL in the account to the validator based on their MEV commission rate. Remaining funds are sent to stakers' stake accounts pro-rata.

- After the merkle root has been uploaded, merkle proofs are uploaded on-chain and the program will transfer SOL from the tip distribution account to the validator's vote account and stake accounts.

![Uploading MEV Airdrop Merkle Root & Claiming](uploading_mev_merkle_root.png)

[Jito Tip Distribution Program]: https://jito-foundation.gitbook.io/mev/mev-payment-and-distribution/tip-distribution-program

#### The Centralization Problem

- Merkle root upload authority is permissioned with opt-in from each Jito-Solana validator. This mechanism creates a single point of potential failure with adverse impacts on network stakeholders and lacks transparency on the calculation.

- This permissioned approach, while functional, runs counter to the decentralization ethos of blockchain technology.

- The authority to upload the merkle root represents a centralized control point that could potentially be exploited or become a bottleneck in the system.

- Additionally, the reliance on off-chain processes for calculating rewards introduces opacity into a system that ideally should be fully transparent.

#### Restaking as a Solution

Jito's move into restaking represents a strategic pivot toward more decentralized infrastructure:

- Decentralized Security Model: Restaking distributes security responsibility across multiple participants, eliminating single points of failure.

- On-chain Verification: More processes move on-chain, increasing transparency and reducing reliance on trusted third parties.

- Permissionless Participation: Restaking allows broader participation in network security without permissioned gateways.

- Aligned Incentives: Restaking creates economic alignment between asset holders, infrastructure providers, and applications, replacing centralized control with economic incentives.

### A Blueprint for Other Protocols

Many protocols in the Solana ecosystem and beyond face similar centralization challenges:

- Protocols relying on off-chain oracles for critical price data

- Systems with permissioned update authorities

- Applications with centralized admin keys

- Networks dependent on a small set of validators

Jito Restaking provides a blueprint for these protocols to transition toward greater decentralization:

1. **Utilize NCN Framework**

Protocols can leverage Jito's Node Consensus Network framework to create custom security environments.

2. **Economic Security Upgrades**

Replace trusted parties with economic security through staking mechanisms.

3. **Transparent Consensus**

Move critical decision-making to transparent, on-chain voting systems backed by economic stakes.

4. **Composable Security**

Tap into Solana's existing security through the restaking mechanism rather than building isolated security models.

By addressing these centralization concerns through restaking, Jito is not only evolving its own infrastructure but providing a path forward for the entire ecosystem. The restaking mechanism transforms what was once a centralized point of control into a distributed security layer that can support the emerging needs of Solana's ecosystem while serving as a model for other protocols to follow.

## Key Features and Advantages

Jito Restaking offers several innovative features.

1. Universal Framework with Multi-Asset Support

Unlike single-token staking systems, Jito Restaking provides a standardized approach for restaking various SPL tokens to node consensus networks.
This flexibility allows different types of assets to participate in securing networks.

2. Asset Tokenization for Enhanced Liquidity

Staked assets are tokenized into Vault Receipt Tokens (VRTs), giving users liquid representations of their staked assets.
This means participants can maintain exposure to staking rewards while potentially using their VRTs in other DeFi applications.

3. Modular Restaking

Vaults, operators and Node Consensus Networks can choose who they work with based on risk tolerance. Vaults decide which operators and NCNs to delegate to, while operators and NCNs choose which vaults and assets they want to support.

4. Multi-party Opt-in System

One of the most distinctive features of Jito Restaking is its flexible opt-in architecture.
For assets to be considered "staked" to an NCN, these explicit conditions must be met:

1. The **NCN** must opt in to the **Operator**
2. The **Operator** must opt in to the **NCN**
3. The **Operator** must opt in to the **Vault**
4. The **Vault** must opt in to the **Operator**
5. The **Vault** must opt in to the **NCN**
6. The **NCN** must opt in to the **Vault**
7. The **Vault** is delegated to that **Operator**

![Staked venn diagram](staked_venn_diagram.png)

This Multi-party opt-in system ensures that all participants explicitly agree to the terms of their involvement, creating a transparent and consensual staking environment with clear accountability.

5. Slashing Mechanism

Implements penalties for misbehavior, ensuring the security and integrity of the network.

## How Jito Restaking Works

### System Architecture Overview

![System Architecture Overview](system_architecture_overview.png)

### Two Core Programs

Jito Restaking consists of two main programs:

1. [**Restaking Program**](https://github.com/jito-foundation/restaking/blob/master/restaking_program/Cargo.toml)

The Restaking Program acts as a node consensus network and operator registry. The program leverages a flexbile system of admins so NCNs can customize the operators and vaults supported and operators can custimoize the NCNs they stake to and vaults they can receive delegations from.

![Restaking Accounts](restaking_accounts.png)

2. [**Vault Program**](https://github.com/jito-foundation/restaking/blob/master/vault_program/Cargo.toml)

The Vault Program manages the minting and burning of Vault Receipt Tokens (VRTs). VRTs are SPL tokens that represent a pro-rata stake of asssets in the vault. VRTs provide enhanced liquidity, composability, and interoperability with other Solana programs. The program also leverages a flexible system of admins so vaults can customize the capacity, operators that can receive delegations from the vault, the NCNs supported by the vault, and the fee structure for staking and unstaking.

![Vault Accounts](vault_accounts.png)

### The Three Pillars of Jito Restaking

#### 1. Node Consensus Networks (NCNs)

Node Consensus Networks (NCNs) provide essential infrastructure services to the broader network ecosystem.
These services operate off-chain but are verified on-chain, creating a flexible framework for specialized functionality.
The design scope includes any service that can be cryptographically verified through on-chain evidence.

Example include:

- Blockchains and Layer 2 solutions
- Bridges and interoperability protocols
- Oracles and data verification services
- Keepers and automation services
- Rollup services and co-processors
- Zero-knowledge proof generation
- Specialized cryptography services

This architecture allows developers to create custom verification mechanism tailored to their specific service requirements, with the only constraint being that verification evidence must be accessible on-chain.

Learn more about NCNs [here](https://www.jito.network/blog/understanding-node-consensus-networks/)

NCN can be registered through the restaking program.

There are several things one can do after registering a NCN:

- Add and Remove support for operators participating in the NCN operator set.
- Add and Remove support for vaults
- Add and Remove support for slashers
- Withdraw funds sent to the NCN from rewards, airdrops, and other sources.

#### 2. Operators

Operators are entities responsible for running the NCN software. After registering through the restaking program, operators can:

- Add or remove support for Vaults
- Add or remove support for NCNs

#### 3. Vaults

Vaults securely hold staked assets and delegate them to operators. The vault program manages:

- Token deposits and withdraws
- Minting and burning of VRTs
- Delegation of assets to operators
- Administrative functions releated to the vault operation

### Token Flow and State Management

#### Deposit Process: Getting Your Tokens into the System

1. A user deposits tokens into the vault, similar to making a deposit at a bank.

2. The system checks if there's enough room in the vault for these new tokens.

3. The user receives Vault Receipt Tokens (VRTs) in return, which represent their share of the vault's assets.

4. A small fee is taken from these VRTs as a service charge.

5. The original tokens are now safely stored in the vault, while the user holds VRTs that can be used elsewhere or redeemed later.

6. Think of this like depositing cash in a bank and receiving a bank statement showing your balance - the cash is in the bank, but you have proof of ownership.

![Deposit Process](deposit_process.png)

#### Delegation Process: Putting Your Tokens to Work

1. The vault administrator decides which operators to support by delegating tokens to them.

2. Before delegation, the system carefully checks if there are enough available tokens by:

- Looking at how many tokens are in the vault
- Subtracting tokens already being used elsewhere
- Setting aside tokens that users might want to withdraw soon

3. If there are enough available tokens, the delegation goes ahead.

4. This is similar to how a bank might use customer deposits to make loans, while ensuring they keep enough cash on hand for customer withdrawals.

![Delegation Process](delegation_process.png)

#### Withdrawal Process: Getting Your Tokens Back

1. Starting Withdrawal:

- When you want your tokens back, you begin by submitting your VRTs.
- The system creates a withdrawal ticket for you, like taking a number at a service counter.
- Your VRTs are temporarily held by this ticket.

2. Waiting Period:

- All withdrawals go through a cooling-off period of one epoch (a set time period).
- This gives the system time to prepare your tokens for withdrawal, similar to some banks requiring notice for large withdrawals.

3. Completing the Withdrawal

- After the waiting period, your withdrawal can be completed.
- Your VRTs are exchanged back for the original tokens, minus a small withdrawal fee.
- The tokens are transferred to your account, and the withdrawal ticket is closed.

![Withdrawal Process](withdrawal_process.png)

#### Regular System Updates: Keeping Everything in Balance

1. The system performs regular updates at the end of each epoch (time period).

2. During these updates:

- The system takes inventory of all tokens and where they're delegated
- It processes pending withdrawals
- It ensures there are enough tokens set aside for future withdrawals
- It makes sure the records accurately reflect all tokens in the system

3. This regular maintenance ensures the vault stays healthy and can meet all its obligations, similar to how banks reconcile their accounts at the end of each day.

This balanced approach ensures that while tokens are being put to work securing various networks, there are always enough reserves to honor withdrawal requests, maintaining trust in the system.

## Conclusion and Additional Resources

Jito Restaking represents a significant innovation in the staking ecosystem, particularly for Solana and SVM chains.
By introducing a flexible, opt-in based architecture and tokenizing staked assets, it enhances liquidity while maintaining the security benefits of traditional staking.

The system's sophisticated design balances the interests of multiple stakeholders—NCNs, operators, and stakers—creating a robust framework for secure and efficient consensus participation.
As the Solana ecosystem continues to grow, Jito Restaking provides a scalable foundation for supporting diverse network security requirements without fragmenting liquidity.

For developers, node operators, and token holders interested in participating in the Solana ecosystem, understanding Jito Restaking provides insight into an emerging paradigm that could shape the future of blockchain infrastructure and tokenomics.

## References

- [Restaking on Solana: The New Chapter Of A Long History](https://www.jito.network/blog/restaking-on-solana-the-new-chapter/)
