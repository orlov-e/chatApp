import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUserDtoResponse } from './dto';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/guards/public.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Public()
	@Get(':id')
	@ApiOkResponse({
		description: 'User found',
		type: GetUserDtoResponse,
	})
	@ApiNotFoundResponse({
		description: 'User not found',
	})
	async findOne(@Param('id') id: string) {
		return await this.userService.findOne(parseInt(id));
	}
}
