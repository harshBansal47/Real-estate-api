const os = require('os');
const dns = require('dns');

function detectEnvironment() {
    const hostname = os.hostname();

    return new Promise((resolve, reject) => {
        dns.lookup(hostname, { all: true }, (err, addresses) => {
            if (err) {
                reject(err);
            } else {
                for (let addr of addresses) {
                    let ip = addr.address;
                    if (ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
                        resolve('local');
                        return;
                    }
                }
                resolve('server');
            }
        });
    });
}


module.exports = detectEnvironment;