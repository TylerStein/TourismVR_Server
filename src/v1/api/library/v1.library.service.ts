import { Injectable, Inject } from "@nestjs/common";
import { V1LibraryEntry } from "./v1.library.interface";
import { LibraryDataProvider } from "./v1.library.data";

@Injectable()
export class V1LibraryService {
    constructor(
        @Inject('LibraryData') private libraryData: V1LibraryEntry[],
    ) {
        //
    }

    async findAll(): Promise<V1LibraryEntry[]> {
        return this.libraryData;
    }

    async findOne(id: number): Promise<V1LibraryEntry> {
        return this.libraryData.find((value) => value.id == id);
    }

    async exists(id: number): Promise<boolean> {
        return this.libraryData.findIndex((value) => value.id == id) !== -1;
    }
}