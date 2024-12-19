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
  type WritableAccount,
} from "@solana/web3.js";
import { NCN_PORTAL_PROGRAM_ADDRESS } from "../programs";
import { getAccountMetaFactory, type ResolvedAccount } from "../shared";

export const REMOVE_FROM_WHITELIST_DISCRIMINATOR = 3;

export function getRemoveFromWhitelistDiscriminatorBytes() {
  return getU8Encoder().encode(REMOVE_FROM_WHITELIST_DISCRIMINATOR);
}

export type RemoveFromWhitelistInstruction<
  TProgram extends string = typeof NCN_PORTAL_PROGRAM_ADDRESS,
  TAccountWhitelist extends string | IAccountMeta<string> = string,
  TAccountWhitelistEntry extends string | IAccountMeta<string> = string,
  TAccountWhitelistedInfo extends string | IAccountMeta<string> = string,
  TAccountAdminInfo extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = "11111111111111111111111111111111",
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
      TAccountWhitelistedInfo extends string
        ? ReadonlyAccount<TAccountWhitelistedInfo>
        : TAccountWhitelistedInfo,
      TAccountAdminInfo extends string
        ? ReadonlySignerAccount<TAccountAdminInfo> &
            IAccountSignerMeta<TAccountAdminInfo>
        : TAccountAdminInfo,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts,
    ]
  >;

export type RemoveFromWhitelistInstructionData = { discriminator: number };

export type RemoveFromWhitelistInstructionDataArgs = {};

export function getRemoveFromWhitelistInstructionDataEncoder(): Encoder<RemoveFromWhitelistInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([["discriminator", getU8Encoder()]]),
    (value) => ({
      ...value,
      discriminator: REMOVE_FROM_WHITELIST_DISCRIMINATOR,
    }),
  );
}

export function getRemoveFromWhitelistInstructionDataDecoder(): Decoder<RemoveFromWhitelistInstructionData> {
  return getStructDecoder([["discriminator", getU8Decoder()]]);
}

export function getRemoveFromWhitelistInstructionDataCodec(): Codec<
  RemoveFromWhitelistInstructionDataArgs,
  RemoveFromWhitelistInstructionData
> {
  return combineCodec(
    getRemoveFromWhitelistInstructionDataEncoder(),
    getRemoveFromWhitelistInstructionDataDecoder(),
  );
}

export type RemoveFromWhitelistInput<
  TAccountWhitelist extends string = string,
  TAccountWhitelistEntry extends string = string,
  TAccountWhitelistedInfo extends string = string,
  TAccountAdminInfo extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  whitelist: Address<TAccountWhitelist>;
  whitelistEntry: Address<TAccountWhitelistEntry>;
  whitelistedInfo: Address<TAccountWhitelistedInfo>;
  adminInfo: TransactionSigner<TAccountAdminInfo>;
  systemProgram?: Address<TAccountSystemProgram>;
};

export function getRemoveFromWhitelistInstruction<
  TAccountWhitelist extends string,
  TAccountWhitelistEntry extends string,
  TAccountWhitelistedInfo extends string,
  TAccountAdminInfo extends string,
  TAccountSystemProgram extends string,
  TProgramAddress extends Address = typeof NCN_PORTAL_PROGRAM_ADDRESS,
>(
  input: RemoveFromWhitelistInput<
    TAccountWhitelist,
    TAccountWhitelistEntry,
    TAccountWhitelistedInfo,
    TAccountAdminInfo,
    TAccountSystemProgram
  >,
  config?: { programAddress?: TProgramAddress },
): RemoveFromWhitelistInstruction<
  TProgramAddress,
  TAccountWhitelist,
  TAccountWhitelistEntry,
  TAccountWhitelistedInfo,
  TAccountAdminInfo,
  TAccountSystemProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? NCN_PORTAL_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    whitelist: { value: input.whitelist ?? null, isWritable: false },
    whitelistEntry: { value: input.whitelistEntry ?? null, isWritable: true },
    whitelistedInfo: {
      value: input.whitelistedInfo ?? null,
      isWritable: false,
    },
    adminInfo: { value: input.adminInfo ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      "11111111111111111111111111111111" as Address<"11111111111111111111111111111111">;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, "programId");
  const instruction = {
    accounts: [
      getAccountMeta(accounts.whitelist),
      getAccountMeta(accounts.whitelistEntry),
      getAccountMeta(accounts.whitelistedInfo),
      getAccountMeta(accounts.adminInfo),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getRemoveFromWhitelistInstructionDataEncoder().encode({}),
  } as RemoveFromWhitelistInstruction<
    TProgramAddress,
    TAccountWhitelist,
    TAccountWhitelistEntry,
    TAccountWhitelistedInfo,
    TAccountAdminInfo,
    TAccountSystemProgram
  >;

  return instruction;
}

export type ParsedRemoveFromWhitelistInstruction<
  TProgram extends string = typeof NCN_PORTAL_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    whitelist: TAccountMetas[0];
    whitelistEntry: TAccountMetas[1];
    whitelistedInfo: TAccountMetas[2];
    adminInfo: TAccountMetas[3];
    systemProgram: TAccountMetas[4];
  };
  data: RemoveFromWhitelistInstructionData;
};

export function parseRemoveFromWhitelistInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>,
): ParsedRemoveFromWhitelistInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 5) {
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
      whitelistedInfo: getNextAccount(),
      adminInfo: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getRemoveFromWhitelistInstructionDataDecoder().decode(
      instruction.data,
    ),
  };
}
