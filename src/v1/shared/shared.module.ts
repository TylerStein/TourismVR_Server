import { Module } from "@nestjs/common";
import { PairingService } from "./pairing.service";
import { TokenService } from "./token.service";
import { PlaybackSessionService } from "./playback.session.service";

@Module({
    providers: [
        PairingService,
        TokenService,
        PlaybackSessionService,
    ],
    exports: [
        PairingService,
        TokenService,
        PlaybackSessionService,
    ],
})
export class SharedModule {}