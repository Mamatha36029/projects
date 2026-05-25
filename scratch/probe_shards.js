import net from 'net';

const shards = [
  'cluster0-shard-00-00.yksknog.mongodb.net',
  'cluster0-shard-00-01.yksknog.mongodb.net',
  'cluster0-shard-00-02.yksknog.mongodb.net',
  'ac-isbuj6e-shard-00-00.yksknog.mongodb.net', // I need the middle part
];

async function checkPort(host) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(2000);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('error', () => {
      socket.destroy();
      resolve(false);
    });
    socket.connect(27017, host);
  });
}

async function run() {
  for (const shard of shards) {
    console.log(`Checking ${shard}...`);
    const up = await checkPort(shard);
    console.log(`${shard} is ${up ? 'UP' : 'DOWN'}`);
  }
}

run();
