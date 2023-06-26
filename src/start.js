import getDirname from './getDirname.js';
import up from './modules/fs/up.js';
import ls from './modules/fs/ls.js';
import renameFile from './modules/fs/rename.js';
import createFile from './modules/fs/create.js';
import moveFile from './modules/fs/move.js';
import copyFile from './modules/fs/copy.js';
import deleteFile from './modules/fs/delete.js';
import path from 'path';
import readStream from './modules/streams/read.js';
import osInfo from './modules/os/os.js';
import calcHash from './modules/hash/hash.js';
import compress from './modules/zip/compress.js';
import decompress from './modules/zip/decompress.js';
import fs from 'fs';

const start = () => {
  const Username = process.argv[2].slice(process.argv[2].indexOf('=') + 1);
  let currentUrl = getDirname(import.meta.url);

  console.log(`Welcome to the File Manager, ${Username}!`);
  console.log('You are welcome to print commands. Please, wait for results')

const isAbsolute = (url, curUrl) => {
  return path.isAbsolute(url) 
    ? url
    : path.join(curUrl, url);
}

  const echoInput = async (chunk) => {
    const chunkStringified = chunk.toString();
    switch (true) {
      case chunkStringified.includes('.exit'):
        process.exit(0);
      case chunkStringified.trim() === 'up':
        currentUrl = getDirname(up(currentUrl));
        break;
      case chunkStringified.trim() === 'ls':
        ls(currentUrl);
        break;
      case chunkStringified.trim().startsWith('cd '):
        currentUrl = isAbsolute(chunkStringified.trim().slice(3), currentUrl) 
        break;
      case chunkStringified.trim().startsWith('cat '):
        readStream(isAbsolute(chunkStringified.trim().slice(4), currentUrl));
      break; 
      case chunkStringified.trim().startsWith('add '):
        createFile(isAbsolute(chunkStringified.trim().slice(4), currentUrl));
      break; 
      case chunkStringified.trim().startsWith('rn '):
        const fileNames = chunkStringified.trim().slice(3).split(' ');
        renameFile(isAbsolute(fileNames[0], currentUrl), isAbsolute(fileNames[1], currentUrl));
      break; 
      case chunkStringified.trim().startsWith('cp '):
        const copyFiles = chunkStringified.trim().slice(3).split(' ');
        copyFile(isAbsolute(copyFiles[0], currentUrl), isAbsolute(copyFiles[1], currentUrl));
      break; 
      case chunkStringified.trim().startsWith('mv '):
        const moveFiles = chunkStringified.trim().slice(3).split(' ');
        moveFile(isAbsolute(moveFiles[0], currentUrl), isAbsolute(moveFiles[1], currentUrl));
      break; 
      case chunkStringified.trim().startsWith('rm '):
        deleteFile(isAbsolute(chunkStringified.trim().slice(3), currentUrl));
      break; 
      case chunkStringified.trim().startsWith('os '):
        osInfo(chunkStringified.trim().slice(3));
      break;
      case chunkStringified.trim().startsWith('hash '):
        calcHash(isAbsolute(chunkStringified.trim().slice(5), currentUrl));
      break;
      case chunkStringified.trim().startsWith('compress '):
        const compressFiles = chunkStringified.trim().slice(9).split(' ');
        compress(isAbsolute(compressFiles[0], currentUrl), isAbsolute(compressFiles[1], currentUrl));
      break;
      case chunkStringified.trim().startsWith('decompress '):
        const decompressFiles = chunkStringified.trim().slice(11).split(' ');
        decompress(isAbsolute(decompressFiles[0], currentUrl), isAbsolute(decompressFiles[1], currentUrl));
      break;
      default:
        console.log('Invalid input')
    }      

    fs.stat(currentUrl,(err) => {
      if (err) {
        console.log('No such file or directory');
        currentUrl = currentUrl.slice(0, currentUrl.lastIndexOf('\\'))
      } else {
        console.log(`You are currently in ${currentUrl}`)
        console.log('You are welcome to print commands. Please, wait for results')
      }
    })  
  };

  process.stdin.on('data', echoInput);

  process.on('SIGINT', () => {
    process.exit(0);
  });
 
 process.on('exit', () => {
  console.log(`\nThank you for using File Manager, ${Username}, goodbye!`);
});
};

start();