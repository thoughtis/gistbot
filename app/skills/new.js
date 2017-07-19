let api = require('./../services/api');
let config = require('./../util/config');
let fs = require('fs');
let request = require('superagent');

module.exports.skill = (controller) => {

	controller.hears('new gist', ['direct_message', 'direct_mention', 'mention'], ( bot, message ) => {

		console.log('herrrrd');

		let askQuestion = (response, convo) => {

			convo.ask({
				attachments: [
					{
						title: 'Send me a file!',
						color: '#0079ba',
						text: 'Just to note your new gist will be public!',
						attachment_type: 'default',
					}
				]
			}, (response, convo) => {

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
								convo.say(`Oops something went wrong and I'm just a bot!`);
								convo.next();
							}

							convo.say(`✌️ Dang, here is a new a gist for you! ${ res.body.html_url }`);
							convo.next();

						})

				}).catch((err) => {

					convo.say(`Oops something went wrong and I'm just a bot!`);
					convo.next();

				})

			});

		};

		bot.startConversation(message, askQuestion);

	});

}