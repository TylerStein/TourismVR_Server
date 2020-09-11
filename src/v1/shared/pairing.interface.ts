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