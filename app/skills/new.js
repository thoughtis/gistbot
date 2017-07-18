let api = require('./../services/api');
let config = require('./../util/config');
let fs = require('fs');
let request = require('superagent');

module.exports.skill = (controller) => {

	controller.hears('new gist', ['direct_message', 'direct_mention', 'mention'], ( bot, message ) => {

		let askQuestion = (response, convo) => {

			convo.ask({ text: `Please upload a file you'd like a *gist* for!`}, (response, convo) => {

				api.downloadFile( 
					response.file.name, 
					response.file.url_private_download, 
					config.token 
				)
				.then(( file ) => {

					return file 

				}).then((file) => {

					let sendAble = {
						"description": "Uploaded from gistbot!",
						"public": true,
						"files": {}
					}

					sendAble.files[file.name] = {} 
					sendAble.files[file.name].content = fs.readFileSync(file.path, "utf8");

					request
						.post('https://api.github.com/gists')
						.send(sendAble)
						.end((err, res) => {

							if(err) {
								convo.say('There was an error! Maybe try again????');
								convo.next();
							}

							convo.say(`Ya! Ya! Ya! Here's a gist for you! ${ res.body.html_url }`);
							convo.next();

						})

				}).catch((err) => {

					convo.say('There was an error! Maybe try again????');
					convo.next();

				})

			});

		};

		bot.startConversation(message, askQuestion);

	});

}