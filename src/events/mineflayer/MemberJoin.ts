import { Util } from 'discord.js';
import guildEvent from '../../util/Emojis';
import { Event } from '../../interfaces/Event';

export default {
	name: 'chat:memberJoin',
	runOnce: false,
	run: async (bot, message) => {
		const messageArray: string[] = message.toString().split(',');

		const hypixelRank = messageArray[0] as string | null;
		const playerName = messageArray[1] as string;

		await bot.sendToDiscord(
			'gc',
			`${guildEvent} ${hypixelRank ?? ''}${Util.escapeMarkdown(playerName)} joined the guild!`,
		);
	},
} as Event;
