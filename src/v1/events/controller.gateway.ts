import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage, WsResponse } from "@nestjs/websockets";
import { IncomingMessage } from "http";
import { HttpStatus } from "@nestjs/common";
import { PairingService } from "../shared/pairing.service";
import WebSocket, { Server } from "ws";
import { Observable, of } from "rxjs";

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
    }

    handleConnection(client: WebSocket, message: IncomingMessage) {
        const authHeader = message.headers['authorization'];
        if (!authHeader) {
            client.close(HttpStatus.UNAUTHORIZED, JSON.stringify({ event: 'err', data: 'Unauthorized' }));
            console.log('Controller.handleConnection denied new client: ', message.headers);
        } else {
            this.pairingService.startPairingSession(authHeader, client);
            console.log('Controller.handleConnection accepted new client: ', message.headers);
        }
    }

    @SubscribeMessage('play')
    onPlayEvent(client: WebSocket, data: any): Observable<WsResponse<number>> {
        console.log('Controller.onPlayEvent %s', JSON.stringify({ data }));
        return of({ event: 'status', data: 200 });
    }

    @SubscribeMessage('stop')
    onStopEvent(client: WebSocket, data: any): Observable<WsResponse<number>> {
        console.log('Controller.onStopEvent %s', JSON.stringify({ data }));
        return of({ event: 'status', data: 200 });
    }

    @SubscribeMessage('file')
    onFileEvent(client: WebSocket, data: any): Observable<WsResponse<number>> {
        console.log('Controller.onFileEvent %s', JSON.stringify({ data }));
        return of({ event: 'status', data: 200 });
    }
}