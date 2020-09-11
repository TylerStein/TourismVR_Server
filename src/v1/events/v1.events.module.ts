import { Module } from "@nestjs/common";
import { PlayerGateway } from "./player.gateway";
import { SharedModule } from "../shared/shared.module";
import { ControllerGateway } from "./controller.gateway";

@Module({
    imports: [
        SharedModule,
    ],
    providers: [
        PlayerGateway,
        ControllerGateway,
    ],
})
export class V1EventsModule {}