import { PrismaService } from '#src/common/services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
	constructor(private prisma: PrismaService) {}

	async getMessages(dialogId: number) {
		return this.prisma.message.findMany({
			where: {
				dialogId: dialogId,
			},
			include: {
				dialog: true,
				sender: true,
			},
		});
	}

	async createMessage(text: string, dialogId: number, senderId: number) {
		const message = await this.prisma.message.create({
			data: {
				text,
				dialogId,
				senderId,
			},
			include: {
				dialog: true,
				sender: true,
			},
		});
		return message;
	}

	async deleteMessage(messageId: number) {
		return this.prisma.message.delete({
			where: { id: messageId },
		});
	}
}
