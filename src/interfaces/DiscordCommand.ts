import { ApplicationCommandOption } from 'discord.js';
import { CommandInteraction } from 'discord.js';
import Bot from '../classes/Bot';

export interface Command {
	data: {
		name: string;
		description?: string;
		type?: number;
		options?: ApplicationCommandOption[];
	};
	permission?: string[];
	run: ExecuteCommand;
}

export interface ExecuteCommand {
	(bot: Bot, interaction: CommandInteraction, args: any[]): Promise<unknown>;
}
