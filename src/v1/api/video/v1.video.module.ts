import { Module } from "@nestjs/common";
import { V1LibraryModule } from "../library/v1.library.module";
import { V1VideoService } from "./v1.video.service";
import { V1VideoController } from "./v1.video.controller";
import { SharedModule } from "src/v1/shared/shared.module";

@Module({
    imports: [
        SharedModule,
        V1LibraryModule,
    ],
    controllers: [
        V1VideoController,
    ],
    providers: [
        V1VideoService,
    ],
})
export class V1VideoModule {}