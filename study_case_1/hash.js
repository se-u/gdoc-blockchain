const SHA256 = require('crypto-js/sha256');


let payload = 0;
while (true){
    const hash = SHA256(payload.toString()).toString();
    if (hash.startsWith('0000000')){
        console.log(`found hash ${hash} for payload ${payload}`);
        break;
    }
    payload++;
}