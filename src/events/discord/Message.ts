import { Event } from '../../interfaces/Event';
import { Message, Util } from 'discord.js';
import Bot from '../../classes/Bot';
import BadWords from '../../util/BadWords';

export const event: Event = {
	name: 'messageCreate',
	runOnce: false,
	run: async (bot: Bot, message: Message) => {
		if (
			message.content.startsWith(process.env.PREFIX as string) ||
			message.author.bot ||
			message.attachments.size > 0 ||
			message.member === null ||
			(message.channel != bot.memberChannel && message.channel != bot.officerChannel)
		)
			return;

		if (message.content.length > 217) {
			await message.channel.send(`Your message is too long! ${message.content.length}/217`);
			return;
		}

		try {
			await message.delete();
		} catch {
			await message.channel.send(`Warning: ${message.author.username}, could not delete message.`);
		}

		if (BadWords.some((word) => message.content.includes(word))) {
			await message.channel.send(`Warning: ${message.author.username}, you may not use profane language!`);
			return;
		}

		message.content = `${message.member.displayName} > ${Util.escapeMarkdown(message.content)}`;
		await bot.sendGuildMessage(message.channel === bot.memberChannel ? 'gc' : 'oc', message.content);
	},
};
