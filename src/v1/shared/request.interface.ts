import { Request } from "express";
import { PairSession, PlaybackSession } from "./pairing.interface";

export interface PairedRequest extends Request {
    token: string;
    session: PairSession;
}

export interface PlaybackSessionRequest extends Request {
    playbackSession: PlaybackSession;
}