import { Event } from '../../interfaces/Event';

export default {
	name: 'chat:commentBlocked',
	runOnce: false,
	run: async (bot, message) => {
		const messageArray: string[] = message.toString().split(',');

		const comment = messageArray[0] as string;
		const reason = messageArray[1] as string;

		bot.logger.warn(`Comment blocked by Hypixel: ${comment} (${reason})`);
		bot.sendToDiscord(
			'oc',
			`:rotating_light: "${comment}" was blocked by Hypixel because **${reason}**. Hychat developers will not take responsibility for banned accounts.`,
		);
	},
} as Event;
