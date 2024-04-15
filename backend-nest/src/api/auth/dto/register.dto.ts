import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterRequestDTO {
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
	@IsString()
	password: string;

	@ApiProperty({
		type: 'string',
		description: 'User first name.',
		required: true,
	})
	@IsString()
	firstName: string;

	@ApiProperty({
		type: 'string',
		description: 'User last name.',
		required: true,
	})
	@IsString()
	lastName: string;
}
