import { MineflayerEvent } from '../../interfaces/Event';
import { MessageEmbed } from 'discord.js';

export const event: MineflayerEvent = {
	name: 'chat:questComplete',
	runOnce: false,
	run: async (bot) => {
		const embed = new MessageEmbed()
			.setTitle('Quest Complete')
			.setDescription("The guild has completed this week's Guild Quest!") // eslint-disable-line quotes
			.setColor('GREEN')
			.setTimestamp();

		return await bot.chatHook.send({
			embeds: [embed],
		});
	},
};
