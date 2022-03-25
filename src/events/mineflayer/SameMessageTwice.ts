import { Event } from '../../interfaces/Event';

export const event: Event = {
	name: 'chat:sameMessageTwice',
	runOnce: false,
	run: async (bot) => {
		bot.chatHook.send('`You cannot say the same message twice!`');
	},
};
