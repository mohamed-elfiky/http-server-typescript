import fs from 'fs';
import path from 'path';

export class HTTPFileHandler {
    private readonly basePath: string;

    constructor() {
        const args = process.argv.slice(2);
        this.basePath = args[1];
        console.log('Base path:', this.basePath);
    }

    getFile(fileName: string): string {
        return fs.readFileSync(path.join(this.basePath, fileName)).toString();
    }

    saveFile(fileName: string, content: string): void {
        fs.writeFileSync(path.join(this.basePath, fileName), content);
    }
}


export default new HTTPFileHandler();