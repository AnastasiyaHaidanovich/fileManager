import crypto from 'crypto';

const calcHash = async (url) => {
  console.log('hash: ', crypto.createHash('sha256').update(url).digest('hex'))
};

export default calcHash;