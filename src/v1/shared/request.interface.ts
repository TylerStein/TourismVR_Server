import { Request } from "express";
import { PairSession } from "./pairing.interface";

export interface PairedRequest extends Request {
    token: string;
    session: PairSession;
}