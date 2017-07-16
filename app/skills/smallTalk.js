module.exports.skill = function(controller) {

	let smallTalk = [
		{
			pattern: 'hi|Hi|Hello|sup|Sup|How are you',
			response: 'Hi! 😎, say "help" to get started!'
		}
	];

	smallTalk.map((talk, idx) => {

		controller.hears(talk.pattern, ['direct_message', 'direct_mention', 'mention'], function( bot, message ) {

			bot.reply(message, talk.response);

		});

	})

}