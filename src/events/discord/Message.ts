import { Event } from '../../interfaces/Event';
import { Message } from 'discord.js';
import Bot from '../../classes/Bot';

export const event: Event = {
	name: 'messageCreate',
	runOnce: false,
	run: async (bot: Bot, message: Message) => {
		console.log('Message!');
	},
};
