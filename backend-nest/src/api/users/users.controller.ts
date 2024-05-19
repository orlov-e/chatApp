import { Controller, Get, NotFoundException, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUserDtoResponse } from './dto';
import { ApiBody, ApiConsumes, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/guards/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '#src/common/services/cloudinary.service';
import UserId from '#src/common/decorators/user-id.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService, private readonly cloudinaryService: CloudinaryService) {}

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
		console.log('userId', id);
		return await this.userService.findOne(parseInt(id));
	}

	@Post('find')
	@ApiOkResponse({
		description: 'Users found',
	})
	@ApiNotFoundResponse({
		description: 'Users not found',
	})
	async findUsers(@UserId() userId: number, @Query('query') query: string) {
		const [firstWord, secondWord] = query.split(' ');
		console.log(userId, query);
		const users = await this.userService.findUsers(userId, {
			email: query,
			firstName: firstWord,
			lastName: secondWord,
		});

		if (!users || users.length === 0) {
			throw new NotFoundException('Users not found');
		}

		return users;
	}

	@Post('upload-avatar')
	@UseInterceptors(FileInterceptor('avatar'))
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				avatar: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@ApiOkResponse({ description: 'Avatar uploaded successfully' })
	async uploadAvatar(@UserId() userId: number, @UploadedFile() file) {
		const imageUrl = await this.cloudinaryService.uploadImage(file.path);
		const user = await this.userService.updateAvatar(userId, imageUrl);
		return user;
	}
}
