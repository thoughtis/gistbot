var request = require('superagent');
var path = require('path');
var fs = require('fs');
var Promise = require('bluebird');

var api = {};

module.exports.downloadFile = ( filename, url, token ) => {

		return new Promise((resolve, reject) => {

			if( ! url || ! token ) {
				reject('Missing URL Or Token!');
			}

			var filePath = path.resolve( __dirname + './../../tmp/' + filename );

			var file = fs.createWriteStream( filePath );

			request.get( url )
				.set('Authorization', `Bearer ${ token }` )
				.pipe( file );

			file.on('finish', () => {

      	resolve({ 
      		name: filename,
      		path: filePath 
      	});

    	});

    	file.on('error', () => {

      	reject( filePath );

    	});

		})	

}