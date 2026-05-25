import { Resolver } from 'dns/promises';

async function checkDnsWithGoogle() {
  const resolver = new Resolver();
  resolver.setServers(['8.8.8.8']);
  
  const srv = '_mongodb._tcp.cluster0.yksknog.mongodb.net';
  
  console.log(`Checking SRV for ${srv} using Google DNS (8.8.8.8)...`);
  try {
    const records = await resolver.resolveSrv(srv);
    console.log('SRV records:', records);
  } catch (e) {
    console.log('Failed to resolve SRV with Google DNS:', e.message);
  }

  const host = 'cluster0.yksknog.mongodb.net';
  console.log(`Checking TXT for ${host} using Google DNS (8.8.8.8)...`);
  try {
    const records = await resolver.resolveTxt(host);
    console.log('TXT records:', records);
  } catch (e) {
    console.log('Failed to resolve TXT:', e.message);
  }
}

checkDnsWithGoogle();
