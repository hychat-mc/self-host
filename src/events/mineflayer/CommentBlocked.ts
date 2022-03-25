import { Event } from '../../interfaces/Event';

export const event: Event = {
	name: 'chat:commentBlocked',
	runOnce: false,
	run: async (bot, message) => {
		const messageArray: string[] = message.toString().split(',');

		const comment = messageArray[0] as string;
		const reason = messageArray[1] as string;

		bot.logger.warn(`Comment blocked: ${comment} (${reason})`);
		bot.sendToDiscord(
			'gc',
			`The "${comment}" was blocked by Hypixel because "${reason}". Developers will not take responsibility for banned accounts.`,
		);
	},
};
