# Generate BIP84 addresses for coldcard
This litte script will take your coldcard zpub-key and generate a list of recieve and change addresses that you can store somewhere for indipendent verification of the addresses wasabi wallet or electrum creates for you (only native segwit / BIP84).  
This script is only a litte wrapper around a BIP84 library that can be found here: https://github.com/Anderson-Juhasc/bip84

BEFORE YOU TRUST THIS SCRIPT PLEASE DOUBLE CHECK THAT IT WORKS CORRECTLY, SEE THE LAST SECTION !!!!!

## Get your public.txt from your coldcard
Insert a SD-Card in your Cold-Card    
```
Settings -> Blockchain -> Choose Bitcoin or Testnet: Bitcoin
```
then 
```
Advanced -> MicroSD Card ->Dump summary
```
this will create the file public.txt on your sd card. 
Open public.txt and get your zpub from the last section with the header:  
`## For BIP84 (Native Segwit P2PKH): m/84'/0'/{account}'/{change}/{idx}`  
you need the zpub from the second line (this line ends with `##SLIP-132##`)  
(`##SLIP-132##` ist not part of the zpub, do not copy it)

## Installation
You will need to install node.js and git on your system
### Ubuntu (tested for 18.04)
```
sudo apt install nodejs npm git  
git clone https://github.com/Anderson-Juhasc/bip84.git
npm install bip84 --save
```     
if the last command fails you might have to do: `sudo npm install bip84 --save`
### Windows
Install node.js from: https://nodejs.org/en/  
Install git from: https://git-scm.com/  
Open an elevated command prompt with admin rights:  
```
git clone https://github.com/Anderson-Juhasc/bip84.git  
npm install bip84 --save  
 ```
### Clone this repository  
```
git clone https://github.com/peli-pro/coldcard_bip84_address_generator.git
```
then copy `generate_bip84_addresses.js` from the `coldcard_bip84_address_generator`folder into the `bip84` folder.


## Run
Run the following command in the the bip84 folder (replace `<replace this with your zpub>` with your zpub from the last step)  
```
node generate_bip84_addresses.js <replace this with your zpub>
``` 
Example:  
```
node generate_bip84_addresses.js zpub6rRmr7DviwWPPQFZYgpL7cniK2PCiMSMnMDaKTe37nBFHhKuD9uWeUZbrsoib7PChrvmNiw5uoAyamAFmioZx3uo2BVTKHi6YCRJUhZGHAz  
```
This will generate the first 50 recieve and change addresses.

## Testnet
Switch your Coldcard to testnet and export the public.txt.  
For testnet the required key starts with vpub. Use this key as your zpub.

## Verify that the addresses generated here are correct with Ian Colemans BIP39 Mnemonic code converter
To double check that this script works, you could open the Ian Colemans well known BIP39 Mnemonic code converter https://iancoleman.io/bip39/ and generate a mnemonic (DO NOT expose your own mnemonic!)  
Choose `Coin: Bitcoin or Bitcoin Testnet`, for the `derivation path` choose `BIP84`.    
`External/Internal`: 0 generates recieve addresses, 1 generates change addresses.  
This will generate a bunch of addresses.  
Then use the `Account Extended Public Key` as the zpub value and run this script.
Compare the addresses generated by this script with the addresses generated with Ian Colemans tool.
Switch `External/Internal` from `0` to `1` and compare the change addresses.  
Why can't you use Ian Colemans BIP39 tool directly?  
Because it will only generate the addresses from the mnemonic/private seed or the zprv key (which is pretty dangerous and you could loose your funds). Please don't do it. You bought a coldcard to not expose your private seed to anybody!
