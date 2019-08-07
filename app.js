const request = require('request');
const yargs = require('yargs');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help','h')
	.argv;

var encodedAddress = encodeURIComponent(argv.address);

request({
	url: `https://us1.locationiq.com/v1/search.php?key=951c653da2ebd4&q=${encodedAddress}&format=json`,
	json: true
}, (error,response,body) => {
	// console.log(`Address : ${body.result[0].formatted_address}`);
	console.log(`Latitude : ${body[0].lat}`);
	console.log(`Longitude : ${body[0].lon}`);
});