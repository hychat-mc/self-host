import { Event } from '../../interfaces/Event';
import guildEvent from '../../util/Emojis';
import { MessageEmbed } from 'discord.js';

export default {
	name: 'chat:questComplete',
	runOnce: false,
	run: async (bot) => {
		const embed = new MessageEmbed()
			.setDescription(`${guildEvent} The guild has completed this week's Guild Quest!`)
			.setColor('#FFAA00');

		return await bot.sendEmbed('gc', [embed]);
	},
} as Event;
