import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

const compress = (url, compressedUrl) => {
const readStream = fs.createReadStream(url);
const writeStream = fs.createWriteStream(path.join(compressedUrl, path.basename(url)) + '.br');
const brotli = zlib.createBrotliCompress();

const stream = readStream.pipe(brotli).pipe(writeStream);

stream.on('finish', () => {
  console.log('Done compressing');
});
}
export default compress;