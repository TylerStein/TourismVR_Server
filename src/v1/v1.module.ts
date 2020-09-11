import { Module } from "@nestjs/common";
import { V1EventsModule } from "./events/v1.events.module";
import { V1AuthModule } from "./api/auth/v1.auth.module";
import { V1RemoteModule } from "./api/remote/v1.remote.module";
import { V1LibraryModule } from "./api/library/v1.library.module";
import { V1VideoModule } from "./api/video/v1.video.module";

@Module({
    imports: [
        V1AuthModule,
        V1EventsModule,
        V1RemoteModule,
        V1LibraryModule,
        V1VideoModule,
    ],
})
export class V1Module {}