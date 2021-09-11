"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// TODO: insert each line into blockchain
function createBlock(data){
	let block = {
		prevHash:Blockchain.blocks[Blockchain.blocks.length-1].hash,
		index:Blockchain.blocks.length,
		data:data,
		timestamp:Date.now()
	}
	block.hash = blockHash(block)
	Blockchain.blocks.push(block)
	console.log(block)
}

for (let line of poem) {
	createBlock(line)
}

console.log(createBlock("hello"));
console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);

/**
 * 
 * data must be non-empty
for the genesis block only, the hash must be "000000"
prevHash must be non-empty
index must be an integer >= 0
the hash must match what recomputing the hash with blockHash(..) produces} block 
 *
 */
// **********************************
function verifyChain(blockchain){
	for(let block of blockchain.blocks){
		
		if(block.index<0){return false}
		if(block.index===0){
			console.log(`Verifying genesis block ${JSON.stringify(block)}`);
			if(block.hash!=="000000"){
				return false;
			}
		}
		if(block.index>0){
			if(Blockchain.blocks[block.index-1].hash !== block.prevHash){return false}
			console.log(`Verifying block ${JSON.stringify(block)}`);
			if(block.data===""){return false}
			if(block.prevHash===""){return false}
		}
		console.log(`Verified: block ${block.index}`);
	}
	return true
}


function blockHash(bl) {
	return crypto.createHash("sha256").update(
		JSON.stringify(bl)
		// TODO: use block data to calculate hash
	).digest("hex");
}
