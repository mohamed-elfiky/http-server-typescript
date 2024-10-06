import zlib from 'zlib'

class HTTPCompressionHandler {

    compress(data: string | Buffer): Buffer {
        return zlib.gzipSync(data)
    }
}

export const compressionHandler = new HTTPCompressionHandler()