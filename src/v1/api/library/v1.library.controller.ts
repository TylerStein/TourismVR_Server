import { Controller, Get, UseGuards, Req, Param, Res } from "@nestjs/common";
import { V1LibraryService } from "./v1.library.service";
import { TokenGuard, SessionGuard } from "src/v1/guards/auth.guards";

@Controller('v1/library')
@UseGuards(SessionGuard, TokenGuard)
export class V1LibraryController {
    constructor(
        private libraryService: V1LibraryService,
    ) {
        //
    }

    @Get()
    public get() {
        return this.libraryService.findAll();
    }
}