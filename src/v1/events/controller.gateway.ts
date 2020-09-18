import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage, WsResponse } from "@nestjs/websockets";
import { IncomingMessage } from "http";
import { HttpStatus } from "@nestjs/common";
import { PairingService } from "../shared/pairing.service";
import WebSocket, { Server } from "ws";
import { Observable, of } from "rxjs";
import { PairSession } from "../shared/pairing.interface";

@WebSocketGateway(9090)
export class ControllerGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    constructor(
      private pairingService: PairingService,
    ) {
      //
    }

    handleDisconnect(client: WebSocket) {
        console.log('Controller.handleDisconnect');
        
        const session: PairSession = this.pairingService.getPairSessionFromController(client);

        if (session) {
            session.removeControllerSocket();

            if (session.playerSocket) {
                session.playerSocket.send(JSON.stringify({ event: 'close', data: 'controller disconnected' }));
            }
        }
    }

    handleConnection(client: WebSocket, message: IncomingMessage) {
        const authHeader = message.headers['authorization'];
        if (!authHeader) {
            client.close(HttpStatus.UNAUTHORIZED, JSON.stringify({ event: 'err', data: 'Unauthorized' }));
            console.log('Controller.handleConnection denied new client: ', message.headers);
        } else {
            this.pairingService.connectPairingSessionController(authHeader, client);
            console.log('Controller.handleConnection accepted new client: ', message.headers);
        }
    }

    @SubscribeMessage('play')
    onPlayEvent(client: WebSocket, data: any): Observable<WsResponse<number>> {
        console.log('Controller.onPlayEvent %s', JSON.stringify({ data }));

        const session: PairSession = this.pairingService.getPairSessionFromController(client);
        if (!session || !session.controllerSocket) return of({ event: 'err', data: 404 });
    
        session.playerSocket.send(JSON.stringify({ event: 'play', data: 'play' }));
        return of({ event: 'status', data: 200 });
    }

    @SubscribeMessage('stop')
    onStopEvent(client: WebSocket, data: any): Observable<WsResponse<number>> {
        console.log('Controller.onStopEvent %s', JSON.stringify({ data }));

        const session: PairSession = this.pairingService.getPairSessionFromController(client);
        if (!session || !session.controllerSocket) return of({ event: 'err', data: 404 });
    
        session.playerSocket.send(JSON.stringify({ event: 'stop', data: 'stop' }));
        return of({ event: 'status', data: 200 });
    }
}