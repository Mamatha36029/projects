import { Resolver } from 'dns/promises';

async function checkDnsWithGoogle() {
  const resolver = new Resolver();
  resolver.setServers(['8.8.8.8']);
  
  const srv = '_mongodb._tcp.agrovision.y18kjs6.mongodb.net';
  
  console.log(`Checking SRV for ${srv} using Google DNS (8.8.8.8)...`);
  try {
    const records = await resolver.resolveSrv(srv);
    console.log('SRV records:', records);
  } catch (e) {
    console.log('Failed to resolve SRV with Google DNS:', e.message);
  }
}

checkDnsWithGoogle();
