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
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/web3.js';
import { NCN_PORTAL_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const INITIALIZE_WHITELIST_DISCRIMINATOR = 0;

export function getInitializeWhitelistDiscriminatorBytes() {
  return getU8Encoder().encode(INITIALIZE_WHITELIST_DISCRIMINATOR);
}

export type InitializeWhitelistInstruction<
  TProgram extends string = typeof NCN_PORTAL_PROGRAM_ADDRESS,
  TAccountWhitelist extends string | IAccountMeta<string> = string,
  TAccountAdmin extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountWhitelist extends string
        ? WritableAccount<TAccountWhitelist>
        : TAccountWhitelist,
      TAccountAdmin extends string
        ? WritableSignerAccount<TAccountAdmin> &
            IAccountSignerMeta<TAccountAdmin>
        : TAccountAdmin,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts,
    ]
  >;

export type InitializeWhitelistInstructionData = { discriminator: number };

export type InitializeWhitelistInstructionDataArgs = {};

export function getInitializeWhitelistInstructionDataEncoder(): Encoder<InitializeWhitelistInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: INITIALIZE_WHITELIST_DISCRIMINATOR })
  );
}

export function getInitializeWhitelistInstructionDataDecoder(): Decoder<InitializeWhitelistInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getInitializeWhitelistInstructionDataCodec(): Codec<
  InitializeWhitelistInstructionDataArgs,
  InitializeWhitelistInstructionData
> {
  return combineCodec(
    getInitializeWhitelistInstructionDataEncoder(),
    getInitializeWhitelistInstructionDataDecoder()
  );
}

export type InitializeWhitelistInput<
  TAccountWhitelist extends string = string,
  TAccountAdmin extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  whitelist: Address<TAccountWhitelist>;
  admin: TransactionSigner<TAccountAdmin>;
  systemProgram?: Address<TAccountSystemProgram>;
};

export function getInitializeWhitelistInstruction<
  TAccountWhitelist extends string,
  TAccountAdmin extends string,
  TAccountSystemProgram extends string,
  TProgramAddress extends Address = typeof NCN_PORTAL_PROGRAM_ADDRESS,
>(
  input: InitializeWhitelistInput<
    TAccountWhitelist,
    TAccountAdmin,
    TAccountSystemProgram
  >,
  config?: { programAddress?: TProgramAddress }
): InitializeWhitelistInstruction<
  TProgramAddress,
  TAccountWhitelist,
  TAccountAdmin,
  TAccountSystemProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? NCN_PORTAL_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    whitelist: { value: input.whitelist ?? null, isWritable: true },
    admin: { value: input.admin ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.whitelist),
      getAccountMeta(accounts.admin),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getInitializeWhitelistInstructionDataEncoder().encode({}),
  } as InitializeWhitelistInstruction<
    TProgramAddress,
    TAccountWhitelist,
    TAccountAdmin,
    TAccountSystemProgram
  >;

  return instruction;
}

export type ParsedInitializeWhitelistInstruction<
  TProgram extends string = typeof NCN_PORTAL_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    whitelist: TAccountMetas[0];
    admin: TAccountMetas[1];
    systemProgram: TAccountMetas[2];
  };
  data: InitializeWhitelistInstructionData;
};

export function parseInitializeWhitelistInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedInitializeWhitelistInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 3) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
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
      admin: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getInitializeWhitelistInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
