import { Util } from 'discord.js';
import { Event } from '../../interfaces/Event';

export const event: Event = {
	name: 'chat:memberKicked',
	runOnce: false,
	run: async (bot, message) => {
		const messageArray: string[] = message.toString().split(',');

		const hypixelRank = messageArray[0] as string | null;
		const playerName = messageArray[1] as string;
		const kickedByHypixelRank = messageArray[2] as string | null;
		const kickedByPlayerName = messageArray[3] as string;

		await bot.sendToDiscord(
			'gc',
			`${hypixelRank ?? ''}${Util.escapeMarkdown(playerName)} was kicked by ${
				kickedByHypixelRank + ' ' ?? ''
			}${Util.escapeMarkdown(kickedByPlayerName)}`,
		);
	},
};
