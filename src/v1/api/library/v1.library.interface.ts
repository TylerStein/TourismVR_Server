export interface IV1LibraryEntry {
    id: number,
    name: string;
    location: string;
    durationSeconds: number;
    uploadDate: Date;
    fileName: string;
}

export class V1LibraryEntry implements IV1LibraryEntry {
    constructor(
        public id: number,
        public name: string,
        public location: string,
        public durationSeconds: number,
        public uploadDate: Date,
        public fileName: string,
    ) {
        //
    }

    static from(data: Partial<IV1LibraryEntry>): V1LibraryEntry {
        return new V1LibraryEntry(
            data.id || null,
            data.name || null,
            data.location || null,
            data.durationSeconds || null,
            data.uploadDate || null,
            data.fileName || null,
        );
    }
}