import { chatPatternOptions, createBot } from 'mineflayer';
import consola from 'consola';
import fs from 'fs/promises';
import path from 'path';

import regex from '../util/Regex';
import isObjKey from '../util/IsObjKey';
import { Client, Intents } from 'discord.js';

class Bot {
	public logger = consola;

	public discord = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES] });
	public memberChannel = this.discord.channels.cache.get(process.env.MEMBER_CHANNEL_ID as string);
	public officerChannel = this.discord.channels.cache.get(process.env.OFFICER_CHANNEL_ID as string);

	public onlineCount = 0;
	public totalCount = 125;
	public mineflayer = createBot({
		username: process.env.MINECRAFT_EMAIL as string,
		password: process.env.MINECRAFT_PASSWORD as string,
		host: 'mc.hypixel.net',
		version: '1.16.4',
		logErrors: true,
		hideErrors: false,
		auth: process.env.MINECRAFT_AUTH_TYPE as 'microsoft' | 'mojang',
		checkTimeoutInterval: 30000,
		defaultChatPatterns: false,
	});

	constructor() {
		try {
			this.start();
		} catch (error) {
			this.logger.error(error);
		}
	}

	public async sendMessage(message: string): Promise<void> {
		await this.executeCommand(`/gc ${message}`);
	}

	public async executeCommand(message: string): Promise<void> {
		this.mineflayer.chat(message);
	}

	private async loadEvents(dir = '../events') {
		const files = await fs.readdir(path.join(__dirname, dir));
		const options: chatPatternOptions = { repeat: true, parse: true };

		for (const file of files) {
			const stat = await fs.lstat(path.join(__dirname, dir, file));

			if (stat.isDirectory()) {
				await this.loadEvents(path.join(dir, file));
			} else {
				if (!(file.endsWith('.ts') || file.endsWith('.js'))) continue;
				try {
					const {name, runOnce, run} = (await import(path.join(__dirname, dir, file))).event;

					if (!name) {
						console.warn(`The event ${path.join(__dirname, dir, file)} doesn't have a name!`);
						continue;
					}

					if (!(run && typeof run === 'function')) {
						console.warn(`The event ${name} doesn't have an executable function!`);
						continue;
					}

					if (isObjKey(name, regex)) {
						this.mineflayer.addChatPattern(name, regex[name], options);
						continue;
					}

					if (runOnce) {
						this.mineflayer.once(name, run.bind(null, this));
						continue;
					}

					this.mineflayer.on(name, run.bind(null, this));

					// eslint-disable-next-line @typescript-eslint/no-explicit-any
				} catch (e: any) {
					console.warn(`Error while loading events: ${e.message}`);
				}
			}
		}
	}

	private async start() {
		await this.discord.login(process.env.BOT_TOKEN);

		this.mineflayer.setMaxListeners(20);
		await this.loadEvents();
	}
}

export default Bot;
