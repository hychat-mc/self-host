import { MineflayerEvent } from '../../interfaces/Event';

export const event: MineflayerEvent = {
	name: 'error',
	runOnce: false,
	run: async (bot, error: Error) => {
		bot.logger.error('Encountered an unexpected error. Restarting the bot in 15 seconds...');
		bot.logger.error(error);

		setTimeout(() => {
			process.exit(1);
		}, 15_000);
	},
};
