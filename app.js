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
	if (body.error) {
		console.log('Unable to fetch geocodes');
	}
	else {


	place = body[0].display_name;
	lat = body[0].lat;
	lon = body[0].lon;

	console.log(`Place : ${place}`);	
	console.log(`Latitude : ${lat}`);
	console.log(`Longitude : ${lon}`);
	request({
		url : `https://api.darksky.net/forecast/11530e225f5d076483a750f657f8f6bb/${lat},${lon}`,
		json : true
},(error,response,body) => {
		if(response.statusCode == 200)
	{		
		temperature = body.currently.temperature;
		humidity = body.currently.humidity;
		windspeed = body.currently.windSpeed;
		console.log(`\nTemperature : ${temperature}`);
		console.log(`Humidity : ${humidity}`);
		console.log(`Windspeed : ${windspeed}`);
	}
	else {console.log('Unable to fetch weather')}	
	});
	}
});

