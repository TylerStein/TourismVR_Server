import { Module } from "@nestjs/common";
import { RemoteService } from "./v1.remote.service";
import { RemoteController } from "./v1.remote.controller";
import { SharedModule } from "src/v1/shared/shared.module";
import { V1LibraryModule } from "../library/v1.library.module";

@Module({
    imports: [
        SharedModule,
        V1LibraryModule,
    ],
    controllers: [
        RemoteController,
    ],
    providers: [
        RemoteService,
    ],
})
export class V1RemoteModule {}