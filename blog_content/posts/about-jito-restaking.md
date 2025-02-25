---
title: About Jito Restaking
description: About Jito Restaking
date: 2025-02-26
author: Jito Contributor
tags:
  - tutorials
  - guide
---

## Introduction

### Overview

Jito (Re)staking is a multi-asset staking protocol for Node Consensus Networks (NCNs). The protocol tokenizes staked assets as Vault Receipt Tokens (VRTs) for enhanced liquidity and composability. Node consensus networks can use Jito (Re)staking to easily customize staking parameters, slashing conditions, and economic incentives to tailor their security and tokenomics.

The unique benefits offered by this restaking module position it as the go-to protocol for bootstrapping new networks by utilizing shared security.

This blog will walk you through the basics of getting started with Jito Restaking and NCN developement in your projects.

### About Restaking

Developers seeking to launch a new chain or application had to bootstrap their own validator sets and launch tokens to secure their protocols. Restaking leverages the economic security of existing networks to help deploy new applications and services, providing early-stage teams with stronger security assurances while enhancing stakers’ capital efficiency and returns.

At its core, restaking applies the principles of staking to additional applications, middleware, and chains. Today the concept primarily involves users staking their Liquid Staking Tokens (LSTs) to earn higher rewards by securing more services, hence the term “restaking”.

## Why Jito Restaking

### Addressing Centralization in MEV Distribution

Jito has been working on MEV solutions on Solana. However, this system faced a centralization challenge that the move to restaking helps address.

#### Current Process with MEV Distribution

- Each validator has a unique tip distribution account, owned by the Jito Tip Distribution Program, where SOL is collected for a given epoch.
At the end of the epoch, an off-chain process takes place which produces a merkle tree and merkle root for each validator's tip distribution account.

- Validators can run this process themselves or delegate it to another party.
The merkle tree is intended to distribute any SOL in the account to the validator based on their MEV commission rate. Remaining funds are sent to stakers' stake accounts pro-rata.


- After the merkle root has been uploaded, merkle proofs are uploaded on-chain and the program will transfer SOL from the tip distribution account to the validator's vote account and stake accounts.

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

## Unique Features of Jito Restaking

1. VRT Launch Pad (A Marketplace for Launching VRTs)

Anyone can launch Vault Receipt Tokens with any Solana SPL token through the Vault program. This marketplace also enables the development and launch of various security applications for infrastructure providers and restaking applications through the Restaking Program.

2. Modular Restaking

Vaults, operators and Node Consensus Networks can choose who they work with based on risk tolerance. Vaults decide which operators and NCNs to delegate to, while operators and NCNs choose which vaults and assets they want to support.



## How Jito Restaking Works

### NCN


### Operator


### Vault

## Technical Deep Dive


## Getting Started with Jito Restaking


## Future Developments and Ecosystem Impact

## Conclusion and Additional Resources

## References

- [Restaking on Solana: The New Chapter Of A Long History](https://www.jito.network/blog/restaking-on-solana-the-new-chapter/)