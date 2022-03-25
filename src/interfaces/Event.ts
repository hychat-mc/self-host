import Bot from '../classes/Bot';
import regex from '../util/Regex';
import { BotEvents } from 'mineflayer';
import { ClientEvents } from 'discord.js';

export interface MineflayerEvent {
	name: keyof typeof regex | keyof BotEvents;
	runOnce: boolean;
	run: Execute;
}

export interface DiscordEvent {
	name: keyof ClientEvents;
	runOnce: boolean;
	run: Execute;
}

export interface Execute {
	(bot: Bot, ...params: any[]): Promise<void>; // eslint-disable-line @typescript-eslint/no-explicit-any
}
