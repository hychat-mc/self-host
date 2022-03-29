import { Event } from '../../interfaces/Event';
import success from '../../util/Emojis';

export default {
	name: 'login',
	runOnce: true,
	run: async (bot) => {
		await bot.sendToDiscord(
			'gc',
			`${success} **The bot \`${bot.mineflayer.username}\` has logged in and is now ready!**`,
		);

		setInterval(() => {
			bot.executeCommand('/g online');
		}, 60_000 * 5);

		setTimeout(async () => {
			bot.executeCommand('/g online');
			await bot.sendToLimbo();
		}, 3_000);
	},
} as Event;
