import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Observable, of } from 'rxjs';
import WebSocket, { Server } from 'ws';
import { IncomingMessage } from 'http';
import { PairingService } from '../shared/pairing.service';
import { HttpStatus } from '@nestjs/common';
import { PairSession } from '../shared/pairing.interface';

@WebSocketGateway(9080)
export class PlayerGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private pairingService: PairingService,
  ) {
    //
  }

  handleDisconnect(client: WebSocket) {
    console.log('Player.handleDisconnect');

    const session: PairSession = this.pairingService.getPairSessionFromPlayer(client);
    
    if (session) {
      session.removePlayerSocket();

      if (session.controllerSocket) {
        session.controllerSocket.send(JSON.stringify({ event: 'close', data: 'player disconnected' }));
      }
    }
  }

  handleConnection(client: WebSocket, message: IncomingMessage) {
    const authHeader = message.headers['authorization'];
    if (!authHeader) {
      client.close(HttpStatus.UNAUTHORIZED, JSON.stringify({ event: 'err', data: 'Unauthorized' }));
      console.log('Player.handleConnection denied new client: ', message.headers);
    } else {
      this.pairingService.startPairingSession(authHeader, client);
      console.log('Player.handleConnection accepted new client: ', message.headers);
    }
  }

  @SubscribeMessage('scrub')
  onScrubEvent(client: WebSocket, data: any): Observable<WsResponse<number>> {
    console.log('Player.onScrubEvent %s', JSON.stringify({ data }));

    let scrubValue = 0;
    try {
      scrubValue = parseFloat(data);
    } catch (error) {
      console.error(error);
      return of ({ event: 'err', data: 400 });
    }

    const session: PairSession = this.pairingService.getPairSessionFromPlayer(client);
    if (!session || !session.controllerSocket) return of({ event: 'err', data: 404 });

    session.controllerSocket.send(JSON.stringify({ event: 'scrub', data: scrubValue }));

    return of({ event: 'status', data: 200 });
  }
}