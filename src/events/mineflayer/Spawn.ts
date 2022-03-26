import { Event } from '../../interfaces/Event';

export const event: Event = {
	name: 'spawn',
	runOnce: false,
	run: async (bot) => {
		bot.executeCommand('/g online');
		await bot.sendToLimbo();
	},
};
