// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import NcnPortalIDL from "../../idl/ncn_portal.json";
import type { ParsedNcnPortalInstruction } from '../../idl/shank/programs/index';

// Re-export the generated IDL and type
export NcnPortalIDL;
export NcnPortalIDL.instructions

// The programId is imported from the program IDL.
export const NCN_PORTAL_PROGRAM_ID = new PublicKey(NcnPortalIDL.metadata.address);

// This is a helper function to get the Vesting Anchor program.
export function getVestingProgram(provider: AnchorProvider) {
  return new Program(NcnPortalIDL as ParsedNcnPortalInstruction, NCN_PORTAL_PROGRAM_ID, provider);
}

// This is a helper function to get the program ID for the Vesting program depending on the cluster.
export function getVestingProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
        // This is the program ID for the Vesting program on devnet and testnet.
    //   return new PublicKey('2vKg76rA1Ho27YD4uuc2Z2FCwRTySxdyHup1JjsXS6dp');
    case 'testnet':
      // This is the program ID for the Vesting program on devnet and testnet.
      return new PublicKey('2vKg76rA1Ho27YD4uuc2Z2FCwRTySxdyHup1JjsXS6dp');
    case 'mainnet-beta':
    default:
      return NCN_PORTAL_PROGRAM_ID;
  }
}