import { Module } from "@nestjs/common";
import { V1LibraryController } from "./v1.library.controller";
import { V1LibraryService } from "./v1.library.service";
import { LibraryDataProvider } from "./v1.library.data";
import { SharedModule } from "src/v1/shared/shared.module";

@Module({
    imports: [
        SharedModule,
    ],
    controllers: [
        V1LibraryController,
    ],
    providers: [
        V1LibraryService,
        LibraryDataProvider,
    ],
    exports: [
        V1LibraryService,
    ],
})
export class V1LibraryModule {
    //
}