const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  }
}

const ipfs = new IPFS(ipfsOptions)

ipfs.on('error', (e) => console.error(e))
ipfs.on('ready', async () => {
  const orbitdb = new OrbitDB(ipfs)

  const kv = await orbitdb.keyvalue('correnlty-performance');
  await kv.load();


  // Listen for updates from peers
  kv.events.on('replicated', (address) => {

  })
  console.log("KV Address",kv.address.toString());

  // Add an entry
  const hash = await kv.set('updated',new Date().toLocaleString());
  console.log(hash)

})
