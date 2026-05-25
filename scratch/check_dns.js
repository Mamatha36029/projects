import { promises as dns } from 'dns';

async function checkDns() {
  const host = 'agrovision.y18kjs6.mongodb.net';
  const srv = '_mongodb._tcp.agrovision.y18kjs6.mongodb.net';
  
  console.log(`Checking DNS for ${host}...`);
  try {
    const addresses = await dns.resolve4(host);
    console.log('IPv4 addresses:', addresses);
  } catch (e) {
    console.log('Failed to resolve IPv4:', e.message);
  }

  console.log(`Checking SRV for ${srv}...`);
  try {
    const records = await dns.resolveSrv(srv);
    console.log('SRV records:', records);
  } catch (e) {
    console.log('Failed to resolve SRV:', e.message);
  }
}

checkDns();
