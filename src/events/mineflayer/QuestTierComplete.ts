import { Event } from '../../interfaces/Event';
import guildEvent from '../../util/Emojis';
import { MessageEmbed } from 'discord.js';

export default {
	name: 'chat:questTierComplete',
	runOnce: false,
	run: async (bot, completedTier: number) => {
		const embed = new MessageEmbed()
			.setDescription(`${guildEvent} The guild has completed Tier ${completedTier} of this week's Guild Quest!`)
			.setColor('#36393F');

		return await bot.sendEmbed('gc', [embed]);
	},
} as Event;
