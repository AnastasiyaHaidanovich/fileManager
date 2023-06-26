import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

const decompress = (url, decompressedUrl) => {
  const readStream = fs.createReadStream(url);
  const writeStream = fs.createWriteStream(path.join(decompressedUrl, path.basename(url).slice(0, path.basename(url).length - 3)));
  const brotli = zlib.createBrotliDecompress();
  console.log(path.join(decompressedUrl, path.basename(url).slice(0, path.basename(url).length - 3)))

  const stream = readStream.pipe(brotli).pipe(writeStream);

  stream.on('finish', () => {
    console.log('Done decompressing');
  });
}
export default decompress;