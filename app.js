const request = require('request')
const fs = require('fs');
const os = require('os');


request({
	url: 'http://www.google.com',
	json: true
}, (error,response,body) => {
	console.log(body);
});