import { Event } from '../../interfaces/Event';

export const event: Event = {
	name: 'login',
	runOnce: true,
	run: async (bot) => {
		await bot.sendToDiscord('gc', ' The bot has logged in and is now ready!');

		setInterval(() => {
			bot.executeCommand('/g online');
		}, 60_000 * 5);

		setTimeout(async () => {
			bot.executeCommand('/g online');
			await bot.sendToLimbo();
		}, 3_000);
	},
};
