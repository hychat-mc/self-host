import { Util } from 'discord.js';
import { ChatMessage } from 'prismarine-chat';
import { Event } from '../../interfaces/Event';
import Emojis from '../../util/Emojis';

export default {
	name: 'chat:guildChat',
	runOnce: false,
	run: async (bot, message: ChatMessage) => {
		const messageArray: string[] = message.toString().split(',');

		const channel = messageArray[0] as 'Guild' | 'Officer';
		const hypixelRank = messageArray[1] as string | null;
		const playerName = messageArray[2] as string;
		let guildRank = messageArray[3] as string | null;
		const chatMessage = messageArray[4] as string;

		if (process.env.DISPLAY_GUILD_RANK === 'false') guildRank = null;

		const formattedMessage = ` **${hypixelRank ?? ''}${Util.escapeMarkdown(playerName)}${
			' ' + guildRank ?? ''
		}:** ${Util.escapeMarkdown(chatMessage)}`;
		channel === 'Guild'
			? await bot.sendToDiscord('gc', Emojis.member + formattedMessage)
			: await bot.sendToDiscord('oc', Emojis.officer + formattedMessage);
	},
} as Event;
