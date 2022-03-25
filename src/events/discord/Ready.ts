import { TextChannel } from 'discord.js';
import Bot from '../../classes/Bot';
import { Event } from '../../interfaces/Event';

export const event: Event = {
	name: 'ready',
	runOnce: true,
	run: async (bot: Bot) => {
		bot.memberChannel = bot.discord.channels.cache.get(process.env.MEMBER_CHANNEL_ID as string) as TextChannel;
		bot.officerChannel = bot.discord.channels.cache.get(process.env.OFFICER_CHANNEL_ID as string) as TextChannel;

		bot.discord.user!.setActivity(`${bot.onlineCount} online players | hych.at`, { type: 'WATCHING' });
	},
};
