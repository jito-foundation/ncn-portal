import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgBuyName } from "./types/nameservice/nameservice/tx";
import { MsgSetName } from "./types/nameservice/nameservice/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/nameservice.nameservice.MsgBuyName", MsgBuyName],
    ["/nameservice.nameservice.MsgSetName", MsgSetName],
    
];

export { msgTypes }