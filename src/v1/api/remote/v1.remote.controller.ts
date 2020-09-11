import { Controller, UseGuards, Req, Post, HttpStatus, HttpCode, HttpException, Param, ParseIntPipe } from "@nestjs/common";
import { TokenGuard, SessionGuard } from "../../guards/auth.guards";
import { PairingService } from "src/v1/shared/pairing.service";
import { V1LibraryService } from "../library/v1.library.service";
import { PairedRequest } from "src/v1/shared/request.interface";
import { FileNotFoundException } from "src/v1/shared/exception";
import { TokenService } from "src/v1/shared/token.service";
import { PlaybackSessionService } from "src/v1/shared/playback.session.service";
import { PlaybackSession } from "src/v1/shared/pairing.interface";

@Controller('v1/remote')
@UseGuards(TokenGuard, SessionGuard)
export class RemoteController {
    constructor(
        private tokenService: TokenService,
        private playbackSessionService: PlaybackSessionService,
        private libraryService: V1LibraryService,
    ) {
        //
    }

    @Post('play/:id')
    @HttpCode(HttpStatus.OK)
    async playFile(@Req() req: PairedRequest, @Param('id', ParseIntPipe) id: number) {
        if (await this.libraryService.exists(id) == false) {
            throw new FileNotFoundException(id);
        }

        const playbackToken = this.tokenService.createToken();
        this.playbackSessionService.startPlaybackSession(id, playbackToken, req.session);

        const data = JSON.stringify({ event: 'file', data: `http://127.0.0.1:9000/v1/video/${playbackToken}` });
        const error = await new Promise<Error>((resolve) => {
            console.log('sending %s', data);
            req.session.playerSocket.send(data, (error) => {
                resolve(error);
            });
        })

        if (error) {

            console.log(error);
            throw new HttpException('Unknown error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}