import { Injectable, CanActivate, ExecutionContext, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { TokenService } from "../shared/token.service";
import { PairingService } from "../shared/pairing.service";

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(
        private tokenService: TokenService,
    ) {
        //
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest() as Request;
        const token = req.headers['authorization'];

        if (!token) {
            throw new HttpException('Requires authorization token', HttpStatus.UNAUTHORIZED);
        } else if (this.tokenService.tokenExists(token) == false) {
            throw new HttpException('Invalid authroization token', HttpStatus.UNAUTHORIZED);
        }

        Reflect.set(req, 'authorization', token);
        return true;
    }
}

@Injectable()
export class SessionGuard implements CanActivate {
    constructor(
        private pairingService: PairingService,
    ) {
        //
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest() as Request;
        const token = req.headers['authorization'];

        if (!this.pairingService.sessionExists(token)) {
            throw new HttpException('No session exists with this client token', HttpStatus.BAD_REQUEST);
        }
        
        const session = this.pairingService.getPairSession(token);
        Reflect.set(req, 'session', session);
        return true;
    }
}