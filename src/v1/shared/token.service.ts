import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenService {
    readonly tokenCharacters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    readonly tokenLength: number = 8;

    private _tokens: string[] = [];

    createToken(): string {
        let token = null;
        do {
            token = this._generateToken();
        } while (this.tokenExists(token));

        this._tokens.push(token);
        return token;
    }

    tokenExists(token: string): boolean {
        return this._tokens.includes(token);
    }

    private _generateToken(): string {
        let token = '';
        for (let i = 0; i < this.tokenLength; i ++) {
            token += this._getRandomTokenCharacter(); 
        }

        return token;
    }

    private _getRandomTokenCharacter(): string {
        return this.tokenCharacters[Math.floor(Math.random() * this.tokenCharacters.length)];
    }
}