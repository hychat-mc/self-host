import { Event } from '../../interfaces/Event';
import { Interaction } from 'discord.js';
import Bot from '../../classes/Bot';

export const event: Event = {
	name: 'interactionCreate',
	runOnce: false,
	run: async (bot: Bot, interaction: Interaction) => {
		if (!interaction.isCommand()) return;
	},
};
