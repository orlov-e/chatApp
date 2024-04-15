import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@ApiTags('users')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UsersService) {}

	@Get(':id')
	@ApiOkResponse()
	@ApiNotFoundResponse({ type: UserEntity })
	async findOne(@Param('id') id: string) {
		return await this.userService.findOne(parseInt(id));
	}
}
