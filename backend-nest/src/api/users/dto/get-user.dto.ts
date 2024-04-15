import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

type UserWithoutPassword = Omit<User, 'password'>;

export class GetUserDtoResponse implements UserWithoutPassword {
	@ApiProperty({
		type: 'number',
		description: 'User unique identifier.',
		required: true,
	})
	id: number;

	@ApiProperty({
		type: 'string',
		description: 'User valid email address.',
		required: true,
	})
	email: string;

	@ApiProperty({
		type: 'string',
		description: 'User first name.',
		required: true,
	})
	firstName: string;

	@ApiProperty({
		type: 'string',
		description: 'User last name.',
		required: true,
	})
	lastName: string;

	@ApiProperty({
		type: 'string',
		description: 'User full name.',
		required: true,
	})
	fullName: string;

	@ApiProperty({
		type: 'string',
		description: 'User avatar.',
		required: true,
	})
	avatar: string;

	@ApiProperty({
		type: 'string',
		description: 'User role.',
		required: true,
	})
	last_seen: Date;
}
