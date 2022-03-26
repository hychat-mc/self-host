import { Event } from '../../interfaces/Event';

export const event: Event = {
	name: 'login',
	runOnce: true,
	run: async (bot) => {
		setInterval(() => {
			bot.executeCommand('/g online');
		}, 60_000 * 5);

		setTimeout(async () => {
			bot.executeCommand('/g online');
			await bot.sendToLimbo();
		}, 3_000);
	},
};
