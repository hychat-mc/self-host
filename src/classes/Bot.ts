import { Intents, MessageEmbed, TextChannel } from 'discord.js';
import { chatPatternOptions, createBot } from 'mineflayer';
import consola from 'consola';
import fs from 'fs/promises';
import path from 'path';

import Discord from './Client';
import regex from '../util/Regex';
import isObjKey from '../util/IsObjKey';
import EventEmitter from 'events';
import { Command } from '../interfaces/DiscordCommand';

class Bot {
	public logger = consola;

	public discord = new Discord({ intents: [Intents.FLAGS.GUILD_MESSAGES] });
	public memberChannel?: TextChannel;
	public officerChannel?: TextChannel;

	public onlineCount = 0;
	public totalCount = 125;
	public mineflayer = createBot({
		username: process.env.MINECRAFT_EMAIL as string,
		password: process.env.MINECRAFT_PASSWORD as string,
		host: 'mc.hypixel.net',
		version: '1.16.4',
		logErrors: true,
		hideErrors: true,
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

	public async sendToDiscord(channel: 'gc' | 'oc', content: string) {
		channel === 'gc' ? await this.memberChannel?.send(content) : await this.officerChannel?.send(content);
	}

	public async sendEmbed(channel: 'gc' | 'oc', embeds: MessageEmbed[]) {
		channel === 'gc'
			? await this.memberChannel?.send({ embeds: embeds })
			: await this.officerChannel?.send({ embeds: embeds });
	}

	public async sendGuildMessage(channel: 'gc' | 'oc', message: string) {
		await this.executeCommand(`/${channel} ${message}`);
	}

	public async executeCommand(message: string) {
		this.mineflayer.chat(message);
	}

	public async sendToLimbo() {
		for (let i = 0; i < 12; i++) await this.executeCommand('/');
	}

	public async setStatus() {
		if (this.discord.isReady()) {
			this.discord.user!.setActivity(`${this.onlineCount} online players | hych.at`, { type: 'WATCHING' });
		}
	}

	private async loadEvents(dir: string, emitter: EventEmitter) {
		const files = await fs.readdir(path.join(__dirname, dir));
		const options: chatPatternOptions = { repeat: true, parse: true };

		for (const file of files) {
			const stat = await fs.lstat(path.join(__dirname, dir, file));

			if (stat.isDirectory()) {
				await this.loadEvents(path.join(dir, file), emitter);
			} else {
				if (!(file.endsWith('.ts') || file.endsWith('.js'))) continue;
				try {
					const { name, runOnce, run } = (await import(path.join(__dirname, dir, file))).default;

					if (!name) {
						console.warn(`The event ${path.join(__dirname, dir, file)} doesn't have a name!`);
						continue;
					}

					if (!run) {
						console.warn(`The event ${name} doesn't have an executable function!`);
						continue;
					}

					if (isObjKey(name, regex)) {
						this.mineflayer.addChatPattern(name.replace('chat:', ''), regex[name], options);
					}

					if (runOnce) {
						emitter.once(name, run.bind(null, this));
						continue;
					}

					emitter.on(name, run.bind(null, this));

					// eslint-disable-next-line @typescript-eslint/no-explicit-any
				} catch (e: any) {
					console.warn(`Error while loading events: ${e.message}`);
				}
			}
		}
	}

	private async loadCommands(dir: string) {
		const files = await fs.readdir(path.join(__dirname, dir));

		for (const file of files) {
			const stat = await fs.lstat(path.join(__dirname, dir, file));

			if (stat.isDirectory()) {
				await this.loadCommands(path.join(dir, file));
			} else {
				if (!(file.endsWith('.ts') || file.endsWith('.js'))) continue;
				try {
					const command = (await import(path.join(__dirname, dir, file))).default as Command;

					if (!command.data) {
						console.warn(`The command ${path.join(__dirname, dir, file)} doesn't have a name!`);
						continue;
					}

					if (!command.run) {
						console.warn(`The command ${command.data.name} doesn't have an executable function!`);
						continue;
					}

					this.discord.commands.set(command.data.name, command);
				} catch (e: any) {
					console.warn(`Error while loading commands: ${e.message}`);
				}
			}
		}
	}

	private async start() {
		this.mineflayer.setMaxListeners(20);
		await this.loadCommands('../commands');

		await this.loadEvents('../events/discord', this.discord);
		await this.loadEvents('../events/mineflayer', this.mineflayer);

		await this.discord.login(process.env.BOT_TOKEN);
	}
}

export default Bot;
