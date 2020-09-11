import { HttpException, HttpStatus } from "@nestjs/common";

export class FileNotFoundException extends HttpException {
    constructor(fileId: number | string) {
        super(`No file exists with the id ${fileId}`, HttpStatus.NOT_FOUND);
    }
}