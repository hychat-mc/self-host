import { Util } from 'discord.js';
import { Event } from '../../interfaces/Event';

export default {
	name: 'chat:memberLeave',
	runOnce: false,
	run: async (bot, message) => {
		const messageArray: string[] = message.toString().split(',');

		const hypixelRank = messageArray[0] as string | null;
		const playerName = messageArray[1] as string;

		await bot.sendToDiscord('gc', `${hypixelRank ?? ''}${Util.escapeMarkdown(playerName)} left the guild!`);
	},
} as Event;
