import { Resolver } from 'dns/promises';

async function checkTxt() {
  const resolver = new Resolver();
  resolver.setServers(['8.8.8.8']);
  
  const host = 'agrovision.y18kjs6.mongodb.net';
  
  console.log(`Checking TXT for ${host} using Google DNS (8.8.8.8)...`);
  try {
    const records = await resolver.resolveTxt(host);
    console.log('TXT records:', records);
  } catch (e) {
    console.log('Failed to resolve TXT:', e.message);
  }
}

checkTxt();
