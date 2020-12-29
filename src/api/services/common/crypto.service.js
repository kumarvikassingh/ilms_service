// HELP URL:
// 		https://nodejs.org/en/knowledge/cryptography/how-to-use-crypto-module/
//		https://www.npmjs.com/package/crypto-js

'use strict';

const CryptoJS = require('crypto-js');
const { crypto } = require('./../../../constants');
const key = crypto.securityKey;

class CryptoService {
	static async encrypt(payload, callback) {
		console.log('Encrypt key: ' + key);
		if (!payload) {
			return '';
		}
		try {
			const encryptedPayload = CryptoJS.AES.encrypt(payload, key).toString();
			callback(encryptedPayload);
		} catch (error) {
			console.log('Error occured while encrypting the text: ', error);
			throw error;
		}
	}

	static async decrypt(payload, callback) {
		if (!payload) {
			return '';
		}
		console.log('Decrypt key: ' + key);
		try {
			const decryptedPayload = CryptoJS.AES.decrypt(payload, key).toString(CryptoJS.enc.Utf8);
			callback(decryptedPayload);
		} catch (error) {
			console.log('Error occured while decrypting the text: ', error);
			throw error;
		}
	}
}

module.exports = CryptoService;
