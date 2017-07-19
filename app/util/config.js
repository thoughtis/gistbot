let env = process.env.NODE_ENV || 'development';

if( 'production' === env ) {

	/**
	 * Heroku Stuff
	 */
	
	module.exports = {
    protocol: process.env.protocol,
    host: process.env.host,
    port: process.env.port,
    token: process.env.token,
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret
	}

} else {

	module.exports = require('./../../etc/.env' + (env ? '.' + env : '') + '.js');

}


