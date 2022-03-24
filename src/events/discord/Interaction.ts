import { Execute } from '../../interfaces/Event';
import { Interaction } from 'discord.js';
import Bot from '../../classes/Bot';

export const name = 'interactionCreate';

export const run: Execute = async (bot: Bot, interaction: Interaction) => {
	if (!interaction.isCommand()) return;

	

};