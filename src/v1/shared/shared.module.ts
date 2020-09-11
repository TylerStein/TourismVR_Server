import { Module } from "@nestjs/common";
import { PairingService } from "./pairing.service";
import { TokenService } from "./token.service";

@Module({
    providers: [
        PairingService,
        TokenService,
    ],
    exports: [
        PairingService,
        TokenService,
    ],
})
export class SharedModule {}