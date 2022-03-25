import { Event } from '../../interfaces/Event';

export const event: Event = {
	name: 'end',
	runOnce: false,
	run: async (bot) => {
		bot.logger.error('The bot session has abruptly ended. Restarting the bot in 15 seconds...');

		setTimeout(() => {
			process.exit(1);
		}, 15_000);
	},
};
