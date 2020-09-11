import WebSocket from 'ws';
import { SessionGuard } from '../guards/auth.guards';

export interface IPairSession {
    playerSocket: WebSocket;
    controllerSocket: WebSocket;
    token: string;
}

export class PairSession implements IPairSession {
    constructor(
        public playerSocket: WebSocket,
        public controllerSocket: WebSocket,
        public token: string,
    ) {
        //
    }

    public get isPaired() {
        return this.playerSocket != null && this.controllerSocket != null;
    }

    static from(data: Partial<IPairSession>): PairSession {
        return new PairSession(
            data.playerSocket || null,
            data.controllerSocket || null,
            data.token || null,
        );
    }
}

export interface IPlaybackSession {
    fileId: number;
    playbackToken: string;
    sessionToken: string;
}

export class PlaybackSession implements IPlaybackSession {
    constructor(
        public fileId: number,
        public playbackToken: string,
        public sessionToken: string,
    ) {
        //
    }

    static from(data: Partial<IPlaybackSession>): PlaybackSession {
        return new PlaybackSession(
            data.fileId || null,
            data.playbackToken || null,
            data.sessionToken || null,
        );
    }
}