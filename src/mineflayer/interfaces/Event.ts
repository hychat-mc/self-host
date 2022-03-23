import Bot from '../classes/Bot';
import regex from '../util/Regex';
import { BotEvents } from 'mineflayer';

export interface Event {
	name: keyof typeof regex | keyof BotEvents;
	runOnce: boolean;
	run: Execute;
}

export interface Execute {
	(bot: Bot, ...params: any[]): Promise<void>; // eslint-disable-line @typescript-eslint/no-explicit-any
}
