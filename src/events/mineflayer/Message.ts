import { Event } from '../../interfaces/Event';
import { ChatMessage } from 'prismarine-chat';

export const event: Event = {
	name: 'message',
	runOnce: false,
	run: async (bot, message: ChatMessage) => {
		// Log color chat to console
		bot.logger.log(message.toAnsi());

		// TODO - 27/03/2022: Catch permission errors for guild commands and send to officer chat
	},
};
