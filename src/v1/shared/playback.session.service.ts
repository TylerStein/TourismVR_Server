import { Injectable } from "@nestjs/common";
import { PlaybackSession, PairSession } from "./pairing.interface";
import { exception } from "console";

@Injectable()
export class PlaybackSessionService {
    private _sessions: Map<string, PlaybackSession>;

    constructor() {
        this._sessions = new Map<string, PlaybackSession>();
    }

    sessionExists(playbackToken: string): boolean {
        return this._sessions.has(playbackToken);
    }

    startPlaybackSession(fileId: number, playbackToken: string, pairSession: PairSession) {
        if (this._sessions.has(playbackToken)) {
            throw new exception('A playback session already exists with this token');
        }

        this._sessions.set(playbackToken, PlaybackSession.from({
            fileId: fileId,
            sessionToken: pairSession.token,
            playbackToken: playbackToken,
        }));
    }

    removePlaybackSession(playbackToken: string) {
        if (!this._sessions.has(playbackToken)) {
            throw new exception('No playback session exists with this token');
        }

        this._sessions.delete(playbackToken);
    }

    getPlaybackSession(playbackToken: string) {
        if (!this._sessions.has(playbackToken)) {
            throw new exception('No playback session exists with this token');
        }

        return this._sessions.get(playbackToken);
    }
}