import { Controller, UseGuards, Req, Post, HttpStatus, HttpCode, HttpException, Param } from "@nestjs/common";
import { TokenGuard, SessionGuard } from "../../guards/auth.guards";
import { PairingService } from "src/v1/shared/pairing.service";
import { V1LibraryService } from "../library/v1.library.service";
import { PairedRequest } from "src/v1/shared/request.interface";
import { FileNotFoundException } from "src/v1/shared/exception";

@Controller('v1/remote')
@UseGuards(TokenGuard, SessionGuard)
export class RemoteController {
    constructor(
        private libraryService: V1LibraryService,
    ) {
        //
    }

    @Post('play/:id')
    @HttpCode(HttpStatus.OK)
    async playFile(@Req() req: PairedRequest, @Param('id') id: number) {
        if (await this.libraryService.exists(id) == false) {
            throw new FileNotFoundException(id);
        }

        const data = JSON.stringify({ event: 'file', data: `http://127.0.0.1:9000/v1/video/${id}` });
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