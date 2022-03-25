import { MineflayerEvent } from '../../interfaces/Event';

export const event: MineflayerEvent = {
	name: 'spawn',
	runOnce: false,
	run: async (bot) => {
		bot.executeCommand('/ac \u00a7');
		bot.executeCommand('/g online');
	},
};
