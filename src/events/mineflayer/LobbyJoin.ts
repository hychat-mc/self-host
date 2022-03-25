import { MineflayerEvent } from '../../interfaces/Event';

export const event: MineflayerEvent = {
	name: 'chat:lobbyJoin',
	runOnce: false,
	run: async (bot) => {
		bot.logger.warn('Detected that the bot is not in Limbo, sending illegal character.');
		return await bot.executeCommand('/ac \u00a7');
	},
};
