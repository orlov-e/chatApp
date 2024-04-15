import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export default class LoginRequestDTO {
	@ApiProperty({
		type: 'string',
		description: 'User valid email address.',
		required: true,
	})
	@IsEmail()
	email: string;

	@ApiProperty({
		type: 'string',
		description: 'User password.',
		required: true,
	})
	password: string;
}
