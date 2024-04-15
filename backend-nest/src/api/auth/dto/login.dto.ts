import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginRequestDTO {
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

export class LoginResponseDTO {
	@ApiProperty({ type: 'string', description: 'JWT token.', required: true })
	token: string;
}
