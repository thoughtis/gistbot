module.exports.skill = (controller) => {

	controller.hears('new', ['direct_message', 'direct_mention', 'mention'], ( bot, message ) => {

		let askQuestion = (response, convo) => {

			convo.ask({ text: `I'll need you to login to github first http://holler.com`}, (response, convo) => {

				console.log(response);

			});

		};

		bot.startConversation(message, askQuestion);

	});

}