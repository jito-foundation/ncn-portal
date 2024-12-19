/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type TransactionSigner,
} from "@solana/web3.js";
import { NCN_PORTAL_PROGRAM_ADDRESS } from "../programs";
import { getAccountMetaFactory, type ResolvedAccount } from "../shared";

export const CHECK_WHITELISTED_DISCRIMINATOR = 2;

export function getCheckWhitelistedDiscriminatorBytes() {
  return getU8Encoder().encode(CHECK_WHITELISTED_DISCRIMINATOR);
}

export type CheckWhitelistedInstruction<
  TProgram extends string = typeof NCN_PORTAL_PROGRAM_ADDRESS,
  TAccountWhitelist extends string | IAccountMeta<string> = string,
  TAccountWhitelistEntry extends string | IAccountMeta<string> = string,
  TAccountWhitelisted extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountWhitelist extends string
        ? ReadonlyAccount<TAccountWhitelist>
        : TAccountWhitelist,
      TAccountWhitelistEntry extends string
        ? ReadonlyAccount<TAccountWhitelistEntry>
        : TAccountWhitelistEntry,
      TAccountWhitelisted extends string
        ? ReadonlySignerAccount<TAccountWhitelisted> &
            IAccountSignerMeta<TAccountWhitelisted>
        : TAccountWhitelisted,
      ...TRemainingAccounts,
    ]
  >;

export type CheckWhitelistedInstructionData = { discriminator: number };

export type CheckWhitelistedInstructionDataArgs = {};

export function getCheckWhitelistedInstructionDataEncoder(): Encoder<CheckWhitelistedInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([["discriminator", getU8Encoder()]]),
    (value) => ({ ...value, discriminator: CHECK_WHITELISTED_DISCRIMINATOR }),
  );
}

export function getCheckWhitelistedInstructionDataDecoder(): Decoder<CheckWhitelistedInstructionData> {
  return getStructDecoder([["discriminator", getU8Decoder()]]);
}

export function getCheckWhitelistedInstructionDataCodec(): Codec<
  CheckWhitelistedInstructionDataArgs,
  CheckWhitelistedInstructionData
> {
  return combineCodec(
    getCheckWhitelistedInstructionDataEncoder(),
    getCheckWhitelistedInstructionDataDecoder(),
  );
}

export type CheckWhitelistedInput<
  TAccountWhitelist extends string = string,
  TAccountWhitelistEntry extends string = string,
  TAccountWhitelisted extends string = string,
> = {
  whitelist: Address<TAccountWhitelist>;
  whitelistEntry: Address<TAccountWhitelistEntry>;
  whitelisted: TransactionSigner<TAccountWhitelisted>;
};

export function getCheckWhitelistedInstruction<
  TAccountWhitelist extends string,
  TAccountWhitelistEntry extends string,
  TAccountWhitelisted extends string,
  TProgramAddress extends Address = typeof NCN_PORTAL_PROGRAM_ADDRESS,
>(
  input: CheckWhitelistedInput<
    TAccountWhitelist,
    TAccountWhitelistEntry,
    TAccountWhitelisted
  >,
  config?: { programAddress?: TProgramAddress },
): CheckWhitelistedInstruction<
  TProgramAddress,
  TAccountWhitelist,
  TAccountWhitelistEntry,
  TAccountWhitelisted
> {
  // Program address.
  const programAddress = config?.programAddress ?? NCN_PORTAL_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    whitelist: { value: input.whitelist ?? null, isWritable: false },
    whitelistEntry: { value: input.whitelistEntry ?? null, isWritable: false },
    whitelisted: { value: input.whitelisted ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, "programId");
  const instruction = {
    accounts: [
      getAccountMeta(accounts.whitelist),
      getAccountMeta(accounts.whitelistEntry),
      getAccountMeta(accounts.whitelisted),
    ],
    programAddress,
    data: getCheckWhitelistedInstructionDataEncoder().encode({}),
  } as CheckWhitelistedInstruction<
    TProgramAddress,
    TAccountWhitelist,
    TAccountWhitelistEntry,
    TAccountWhitelisted
  >;

  return instruction;
}

export type ParsedCheckWhitelistedInstruction<
  TProgram extends string = typeof NCN_PORTAL_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    whitelist: TAccountMetas[0];
    whitelistEntry: TAccountMetas[1];
    whitelisted: TAccountMetas[2];
  };
  data: CheckWhitelistedInstructionData;
};

export function parseCheckWhitelistedInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>,
): ParsedCheckWhitelistedInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 3) {
    // TODO: Coded error.
    throw new Error("Not enough accounts");
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      whitelist: getNextAccount(),
      whitelistEntry: getNextAccount(),
      whitelisted: getNextAccount(),
    },
    data: getCheckWhitelistedInstructionDataDecoder().decode(instruction.data),
  };
}
