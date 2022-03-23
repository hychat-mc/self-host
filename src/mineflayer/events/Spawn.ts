import { Execute } from '../interfaces/Event';

export const name = 'spawn';

export const runOnce = false;

export const run: Execute = async (bot) => {
	bot.executeCommand('/ac \u00a7');
	bot.executeCommand('/g online');
};
