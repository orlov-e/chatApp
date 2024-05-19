import { Controller, Get, Post, Body, Query, Delete, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto';
import UserId from '#src/common/decorators/user-id.decorator';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
	constructor(private readonly messagesService: MessagesService) {}

	@Get()
	@ApiOperation({ description: 'Get all messages for a dialog' })
	@ApiOkResponse({ description: 'Return all messages for a dialog.' })
	@ApiNotFoundResponse({ description: 'Messages not found.' })
	async getMessages(@Query('dialogid') dialogId: string) {
		return this.messagesService.getMessages(+dialogId);
	}

	@Post()
	@ApiOperation({ description: 'Create a new message' })
	@ApiOkResponse({ description: 'Message created.' })
	@ApiBadRequestResponse({ description: 'Message not created.' })
	async createMessage(@UserId() userId: number, @Body() payload: CreateMessageDto) {
		return this.messagesService.createMessage(payload.text, payload.dialogId, userId);
	}

	@Delete(':id')
	@ApiOperation({ description: 'Delete a message' })
	@ApiOkResponse({ description: 'Message deleted.' })
	@ApiBadRequestResponse({ description: 'Message not deleted.' })
	@ApiNotFoundResponse({ description: 'Message not found.' })
	async deleteMessage(@Param('id') id: string) {
		return this.messagesService.deleteMessage(+id);
	}
}
