import { MineflayerEvent } from '../../interfaces/Event';

export const event: MineflayerEvent = {
	name: 'chat:sameMessageTwice',
	runOnce: false,
	run: async (bot) => {
		bot.chatHook.send('`You cannot say the same message twice!`');
	},
};
