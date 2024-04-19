import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import {
	ApiTags,
	ApiOkResponse,
	ApiOperation,
	ApiNotFoundResponse,
	ApiBadRequestResponse,
	ApiConflictResponse,
} from '@nestjs/swagger';
import { ExceptionResponseDto } from '#common/dto';
import { DialogsService } from './dialogs.service';
import UserId from '#src/common/decorators/user-id.decorator';
import { CreateDialogDTO, DialogsResponseDTO } from './dto';

@ApiTags('dialogs')
@Controller('dialogs')
export class DialogsController {
	constructor(private readonly dialogsService: DialogsService) {}

	@Get('/')
	@ApiOperation({ description: 'Get all users dialogs' })
	@ApiOkResponse({
		description: 'Return all dialogs for user.',
		type: DialogsResponseDTO,
		isArray: true,
	})
	@ApiNotFoundResponse({
		description: 'Dialogs not found.',
		type: ExceptionResponseDto,
	})
	public async getAll(@UserId() userId: number): Promise<any> {
		const dialogs = await this.dialogsService.getAllDialogs(userId);
		if (!dialogs) throw new NotFoundException('Dialogs not found');
		return dialogs;
	}

	@Post('/')
	@ApiOperation({ description: 'Create new dialog' })
	@ApiOkResponse({
		description: 'Dialog created.',
	})
	@ApiBadRequestResponse({
		description: 'Dialog not created.',
		type: ExceptionResponseDto,
	})
	@ApiConflictResponse({
		description: 'Dialog already exists.',
		type: ExceptionResponseDto,
	})
	public async createDialog(@UserId() userId: number, @Body() data: CreateDialogDTO) {
		const createdDialog = await this.dialogsService.createDialog(userId, data);
		if (!createdDialog) throw new BadRequestException('Dialog not created');
		return { message: 'Dialog created' };
	}

	@Delete('/:id')
	@ApiOperation({ description: 'Delete a dialog' })
	@ApiOkResponse({
		description: 'Dialog deleted.',
	})
	@ApiBadRequestResponse({
		description: 'Dialog not deleted.',
		type: ExceptionResponseDto,
	})
	@ApiNotFoundResponse({
		description: 'Dialog not found.',
		type: ExceptionResponseDto,
	})
	public async deleteDialog(@UserId() userId: number, @Param('id') dialogId: number) {
		const deletedDialog = await this.dialogsService.deleteDialog(dialogId, userId);
		if (!deletedDialog) throw new BadRequestException('Dialog not deleted');
		return { message: 'Dialog deleted' };
	}
}
