import { Injectable } from "@nestjs/common";
import { PairedRequest } from "src/v1/shared/request.interface";
import { Response, Request } from "express";
import { V1LibraryService } from "../library/v1.library.service";
import { FileNotFoundException } from "src/v1/shared/exception";
import { V1LibraryEntry } from "../library/v1.library.interface";
import { promises as fs, createReadStream } from "fs";

@Injectable()
export class V1VideoService {
    readonly assetDirectory = 'assets';

    constructor(
        private libraryService: V1LibraryService,
    ) {
        //
    }

    async streamVideoFile(req: Request, res: Response, fileId: number) {
        if (await this.libraryService.exists(fileId) == false){
            throw new FileNotFoundException(fileId);
        }

        const file: V1LibraryEntry = await this.libraryService.findOne(fileId);
        const path = `${this.assetDirectory}/${file.fileName}`;
        const stat = await fs.stat(path);
        if (!stat.isFile()) {
            console.warn(`File was not found at path: ${path}`);
            throw new FileNotFoundException(fileId);
        }

        const fileSize = stat.size;
        const range = req.headers.range;
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize - 1;
            const chunkSize = (end - start) + 1;
            const fileStream = createReadStream(path, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Linked': chunkSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            fileStream.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            createReadStream(path).pipe(res);
        }
    }
}