import { MineflayerEvent } from '../../interfaces/Event';
import { Util } from 'discord.js';
import Emojis from '../../util/Emojis';

export const event: MineflayerEvent = {
	name: 'chat:joinLeave',
	runOnce: false,
	run: async (bot, message) => {
		const messageArray: string[] = message.toString().split(',');

		const playerName = messageArray[0] as string;
		const status = messageArray[1] as 'joined' | 'left';

		if (status === 'joined') {
			bot.onlineCount++;
			await bot.chatHook.send({
				content: `${Emojis.join} ${Util.escapeMarkdown(playerName)} joined. (\`${bot.onlineCount}\`/\`${
					bot.totalCount
				}\`)`,
			});
		}

		if (status === 'left') {
			bot.onlineCount--;
			await bot.chatHook.send({
				content: `${Emojis.leave} ${Util.escapeMarkdown(playerName)} left. (\`${bot.onlineCount}\`/\`${
					bot.totalCount
				}\`)`,
			});
		}
	},
};
