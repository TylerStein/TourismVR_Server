import { Controller, Get, Req, Param, Res, UseGuards } from "@nestjs/common";
import { V1VideoService } from "./v1.video.service";
import { PairedRequest } from "src/v1/shared/request.interface";
import { Response, Request } from "express";
import { SessionGuard, TokenGuard } from "src/v1/guards/auth.guards";

@Controller('v1/video')
export class V1VideoController {
    constructor(
        private videoService: V1VideoService,
    ) {
        //
    }

    @Get(':id')
    get(@Req() req: Request, @Res() res: Response, @Param('id') id: number) {
        return this.videoService.streamVideoFile(req, res, id);
    }
}