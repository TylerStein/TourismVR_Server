import { Injectable } from "@nestjs/common";
import { exception } from "console";
import { PairSession } from "./pairing.interface";
import WebSocket from 'ws';

@Injectable()
export class PairingService {
    private _sessions: Map<string, PairSession>;

    constructor() {
        this._sessions = new Map<string, PairSession>();
    }

    sessionExists(token: string): boolean {
        return this._sessions.has(token);
    }

    startPairingSession(token: string, playerSocket: WebSocket): void {
        if (this._sessions.has(token)) {
            throw new exception('A session already exists with this token');
        }

        this._sessions.set(token, PairSession.from({ token: token, playerSocket: playerSocket }));
    }

    connectPairingSessionController(token: string, controllerSocket: WebSocket): void {
        if (this._sessions.has(token)) {
            this._sessions.get(token).controllerSocket = controllerSocket;
        } else {
            throw new exception('No session exists with this token');
        }
    }

    removePairingSessionController(token: string, controllerSocket: WebSocket): void {
        if (this._sessions.has(token)) {
            this._sessions.get(token).controllerSocket = null;
        } else {
            throw new exception('No session exists with this token');
        }
    }

    getPairSession(token: string): PairSession {
        if (this._sessions.has(token) == false) {
            throw new exception('No session exists with this token');
        }

        return this._sessions.get(token);
    }
}