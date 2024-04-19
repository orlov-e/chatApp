import { PrismaService } from '#src/common/services';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDialogDTO } from './dto';

@Injectable()
export class DialogsService {
	constructor(private readonly db: PrismaService) {}

	public async getAllDialogs(userId: number) {
		const dialogs = await this.db.$queryRaw`
			SELECT d.id,
				d."createdAt",
				d."updatedAt",
				(SELECT json_build_object(
								'id', u.id,
								'firstName', u."firstName",
								'lastName', u."lastName",
								'email', u.email,
								'last_seen', u."last_seen",
								'isOnline', (u."last_seen" > (CURRENT_TIMESTAMP - INTERVAL '5 minutes'))
						)
					FROM "User" u
					WHERE u.id = d."initiatorId") AS initiator,
				(SELECT json_build_object(
								'id', u.id,
								'firstName', u."firstName",
								'lastName', u."lastName",
								'email', u.email,
								'last_seen', u."last_seen",
								'isOnline', (u."last_seen" > (CURRENT_TIMESTAMP - INTERVAL '5 minutes'))
						)
					FROM "User" u
					WHERE u.id = d."partnerId")   AS partner,
				(SELECT json_build_object(
								'createdAt', m."createdAt",
								'text', m.text
						)
					FROM "Message" m
					WHERE m."dialogId" = d.id
					ORDER BY m."createdAt" DESC
					LIMIT 1)                      AS "lastMessage"
			FROM "Dialog" d
			WHERE d."initiatorId" = ${userId}
			OR d."partnerId" = ${userId}
			ORDER BY d."updatedAt" DESC
		`;

		return dialogs;
	}

	public async createDialog(userId: number, data: CreateDialogDTO) {
		const { partnerId, text } = data;

		const existingDialog = await this.db.dialog.findFirst({
			where: {
				AND: [{ initiatorId: userId }, { partnerId: partnerId }],
			},
		});
		if (existingDialog) throw new ConflictException('Dialog already exists');

		const dialogAndMessage = await this.db.$transaction(async (prisma) => {
			const dialog = await prisma.dialog.create({
				data: {
					initiatorId: userId,
					partnerId: partnerId,
				},
			});

			const message = await prisma.message.create({
				data: {
					text: text,
					senderId: userId,
					dialogId: dialog.id,
				},
			});

			return { dialog, message };
		});

		return dialogAndMessage.dialog;
	}

	public async deleteDialog(dialogId: number, userId: number) {
		const dialog = await this.db.dialog.findFirst({
			where: {
				id: dialogId,
				OR: [{ initiatorId: userId }, { partnerId: userId }],
			},
		});
		if (!dialog) throw new NotFoundException('Dialog not found');

		return await this.db.dialog.delete({ where: { id: dialogId } });
	}
}
