import { DiscordEvent } from '../../interfaces/Event';
import { Message } from 'discord.js';
import Bot from '../../classes/Bot';

export const event: DiscordEvent = {
	name: 'messageCreate',
	runOnce: false,
	run: async (bot: Bot, message: Message) => {},
};
