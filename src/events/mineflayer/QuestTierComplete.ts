import { MessageEmbed } from 'discord.js';
import { Event } from '../../interfaces/Event';
import Emojis from '../../util/Emojis';

export default {
	name: 'chat:questTierComplete',
	runOnce: false,
	run: async (bot, completedTier: number) => {
		const embed = new MessageEmbed()
			.setDescription(`${Emojis.guildEvent} The guild has completed Tier ${completedTier} of this week's Guild Quest!`)
			.setColor('#36393F');

		return await bot.sendEmbed('gc', [embed]);
	},
} as Event;
