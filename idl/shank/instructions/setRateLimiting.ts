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
  getU64Decoder,
  getU64Encoder,
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
  type WritableAccount,
} from "@solana/web3.js";
import { NCN_PORTAL_PROGRAM_ADDRESS } from "../programs";
import { getAccountMetaFactory, type ResolvedAccount } from "../shared";

export const SET_RATE_LIMITING_DISCRIMINATOR = 4;

export function getSetRateLimitingDiscriminatorBytes() {
  return getU8Encoder().encode(SET_RATE_LIMITING_DISCRIMINATOR);
}

export type SetRateLimitingInstruction<
  TProgram extends string = typeof NCN_PORTAL_PROGRAM_ADDRESS,
  TAccountWhitelist extends string | IAccountMeta<string> = string,
  TAccountWhitelistEntry extends string | IAccountMeta<string> = string,
  TAccountAdmin extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountWhitelist extends string
        ? ReadonlyAccount<TAccountWhitelist>
        : TAccountWhitelist,
      TAccountWhitelistEntry extends string
        ? WritableAccount<TAccountWhitelistEntry>
        : TAccountWhitelistEntry,
      TAccountAdmin extends string
        ? ReadonlySignerAccount<TAccountAdmin> &
            IAccountSignerMeta<TAccountAdmin>
        : TAccountAdmin,
      ...TRemainingAccounts,
    ]
  >;

export type SetRateLimitingInstructionData = {
  discriminator: number;
  rateLimiting: bigint;
};

export type SetRateLimitingInstructionDataArgs = {
  rateLimiting: number | bigint;
};

export function getSetRateLimitingInstructionDataEncoder(): Encoder<SetRateLimitingInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ["discriminator", getU8Encoder()],
      ["rateLimiting", getU64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: SET_RATE_LIMITING_DISCRIMINATOR }),
  );
}

export function getSetRateLimitingInstructionDataDecoder(): Decoder<SetRateLimitingInstructionData> {
  return getStructDecoder([
    ["discriminator", getU8Decoder()],
    ["rateLimiting", getU64Decoder()],
  ]);
}

export function getSetRateLimitingInstructionDataCodec(): Codec<
  SetRateLimitingInstructionDataArgs,
  SetRateLimitingInstructionData
> {
  return combineCodec(
    getSetRateLimitingInstructionDataEncoder(),
    getSetRateLimitingInstructionDataDecoder(),
  );
}

export type SetRateLimitingInput<
  TAccountWhitelist extends string = string,
  TAccountWhitelistEntry extends string = string,
  TAccountAdmin extends string = string,
> = {
  whitelist: Address<TAccountWhitelist>;
  whitelistEntry: Address<TAccountWhitelistEntry>;
  admin: TransactionSigner<TAccountAdmin>;
  rateLimiting: SetRateLimitingInstructionDataArgs["rateLimiting"];
};

export function getSetRateLimitingInstruction<
  TAccountWhitelist extends string,
  TAccountWhitelistEntry extends string,
  TAccountAdmin extends string,
  TProgramAddress extends Address = typeof NCN_PORTAL_PROGRAM_ADDRESS,
>(
  input: SetRateLimitingInput<
    TAccountWhitelist,
    TAccountWhitelistEntry,
    TAccountAdmin
  >,
  config?: { programAddress?: TProgramAddress },
): SetRateLimitingInstruction<
  TProgramAddress,
  TAccountWhitelist,
  TAccountWhitelistEntry,
  TAccountAdmin
> {
  // Program address.
  const programAddress = config?.programAddress ?? NCN_PORTAL_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    whitelist: { value: input.whitelist ?? null, isWritable: false },
    whitelistEntry: { value: input.whitelistEntry ?? null, isWritable: true },
    admin: { value: input.admin ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const getAccountMeta = getAccountMetaFactory(programAddress, "programId");
  const instruction = {
    accounts: [
      getAccountMeta(accounts.whitelist),
      getAccountMeta(accounts.whitelistEntry),
      getAccountMeta(accounts.admin),
    ],
    programAddress,
    data: getSetRateLimitingInstructionDataEncoder().encode(
      args as SetRateLimitingInstructionDataArgs,
    ),
  } as SetRateLimitingInstruction<
    TProgramAddress,
    TAccountWhitelist,
    TAccountWhitelistEntry,
    TAccountAdmin
  >;

  return instruction;
}

export type ParsedSetRateLimitingInstruction<
  TProgram extends string = typeof NCN_PORTAL_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    whitelist: TAccountMetas[0];
    whitelistEntry: TAccountMetas[1];
    admin: TAccountMetas[2];
  };
  data: SetRateLimitingInstructionData;
};

export function parseSetRateLimitingInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>,
): ParsedSetRateLimitingInstruction<TProgram, TAccountMetas> {
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
      admin: getNextAccount(),
    },
    data: getSetRateLimitingInstructionDataDecoder().decode(instruction.data),
  };
}
