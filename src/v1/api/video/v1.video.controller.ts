import { Controller, Get, Req, Param, Res, UseGuards, Query, HttpException, HttpStatus } from "@nestjs/common";
import { V1VideoService } from "./v1.video.service";
import { PairedRequest, PlaybackSessionRequest } from "src/v1/shared/request.interface";
import { Response, Request } from "express";
import { SessionGuard, TokenGuard, PlaybackSessionGuard } from "src/v1/guards/auth.guards";
import { PlaybackSessionService } from "src/v1/shared/playback.session.service";
import { PairingService } from "src/v1/shared/pairing.service";

@Controller('v1/video')
export class V1VideoController {
    constructor(
        private playbackSessionService: PlaybackSessionService,
        private pairingService: PairingService,
        private videoService: V1VideoService,
    ) {
        //
    }

    @Get(':session')
    @UseGuards(PlaybackSessionGuard)
    get(@Req() req: PlaybackSessionRequest, @Res() res: Response, @Param('session') sessionToken: string) {
        return this.videoService.streamVideoFile(req, res, req.playbackSession.fileId);
    }
}