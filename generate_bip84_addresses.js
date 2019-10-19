const BIP84 = require('bip84')

var zpub = process.argv[2]

if (typeof zpub === 'undefined') {
    console.log("Please append a proper zpub or vpub string as the first argument")
    process.exit(-1)
}

if (zpub.substring(0,4) != 'zpub' && zpub.substring(0,4) != 'vpub' ) {
    console.log("Please append a proper zpub or vpub string as the first argument")
    process.exit(-1)
}

var account1 = new BIP84.fromZPub(zpub)

if (zpub.substring(0,1)=='z') {
  var ad = 'm/84\'/0\'/0\'/0/'
  var adc = 'm/84\'/0\'/0\'/1/'
}
else if (zpub.substring(0,1)=='v'){
  var ad = 'm/84\'/1\'/0\'/0/'
  var adc = 'm/84\'/1\'/0\'/1/'
}

console.log('Addresses for extended account key '+zpub)
console.log('receive Addresses:')
var c
for (c = 0; c < 50; c++) {
    console.log('Address: '+ad+c, account1.getAddress(c))
  }
console.log('Change Addresses:')
for (c = 0; c < 50; c++) {
    console.log('Address: '+adc+c, account1.getAddress(c, true))
}