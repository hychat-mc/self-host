import { Event } from '../../interfaces/Event';

export const event: Event = {
	name: 'chat:lobbyJoin',
	runOnce: false,
	run: async (bot) => {
		bot.logger.warn('Detected that the bot is not in Limbo, sending to limbo.');
		await bot.sendToLimbo();
	},
};
