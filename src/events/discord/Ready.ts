import Bot from '../../classes/Bot';
import { Execute } from '../../interfaces/Event';

export const name = 'ready';

export const run: Execute = async (bot: Bot) => {
	bot.discord.user!.setActivity(`${bot.onlineCount} online players | hych.at`, { type: 'WATCHING' });
};
