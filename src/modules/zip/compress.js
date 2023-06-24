import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

const compress = (url, params) => {
const links = params.split(' ');
const readStream = fs.createReadStream(path.join(url, links[0]));
const writeStream = fs.createWriteStream(path.join(url, links[1]) + '.br');
const brotli = zlib.createBrotliCompress();

const stream = readStream.pipe(brotli).pipe(writeStream);

stream.on('finish', () => {
  console.log('Done compressing');
});
}
export default compress;