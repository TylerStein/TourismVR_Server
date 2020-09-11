import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { SharedModule } from "src/v1/shared/shared.module";

@Module({
    imports: [
        SharedModule,
    ],
    controllers: [
        AuthController,
    ],
})
export class V1AuthModule {}