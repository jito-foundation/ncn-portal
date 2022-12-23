/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "nameservice.nameservice";

export interface MsgBuyName {
  creator: string;
  name: string;
  bid: string;
}

export interface MsgBuyNameResponse {
}

function createBaseMsgBuyName(): MsgBuyName {
  return { creator: "", name: "", bid: "" };
}

export const MsgBuyName = {
  encode(message: MsgBuyName, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.bid !== "") {
      writer.uint32(26).string(message.bid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBuyName {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBuyName();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.bid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgBuyName {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
      bid: isSet(object.bid) ? String(object.bid) : "",
    };
  },

  toJSON(message: MsgBuyName): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.bid !== undefined && (obj.bid = message.bid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBuyName>, I>>(object: I): MsgBuyName {
    const message = createBaseMsgBuyName();
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    message.bid = object.bid ?? "";
    return message;
  },
};

function createBaseMsgBuyNameResponse(): MsgBuyNameResponse {
  return {};
}

export const MsgBuyNameResponse = {
  encode(_: MsgBuyNameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBuyNameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBuyNameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgBuyNameResponse {
    return {};
  },

  toJSON(_: MsgBuyNameResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBuyNameResponse>, I>>(_: I): MsgBuyNameResponse {
    const message = createBaseMsgBuyNameResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  BuyName(request: MsgBuyName): Promise<MsgBuyNameResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.BuyName = this.BuyName.bind(this);
  }
  BuyName(request: MsgBuyName): Promise<MsgBuyNameResponse> {
    const data = MsgBuyName.encode(request).finish();
    const promise = this.rpc.request("nameservice.nameservice.Msg", "BuyName", data);
    return promise.then((data) => MsgBuyNameResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
