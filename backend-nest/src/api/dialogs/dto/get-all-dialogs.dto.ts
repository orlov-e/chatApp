import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
	@ApiProperty({ type: 'number' })
	id: number;

	@ApiProperty({ type: 'string' })
	firstName: string;

	@ApiProperty({ type: 'string' })
	lastName: string;

	@ApiProperty({ type: 'string' })
	email: string;

	@ApiProperty({ type: 'string', format: 'date-time' })
	last_seen: Date;

	@ApiProperty({ type: 'boolean' })
	isOnline: boolean;
}

export class MessageDTO {
	@ApiProperty({ type: 'string', format: 'date-time' })
	createdAt: Date;

	@ApiProperty({ type: 'string' })
	text: string;
}

export class DialogsResponseDTO {
	@ApiProperty({ type: 'number' })
	id: number;

	@ApiProperty({ type: 'string', format: 'date-time' })
	createdAt: Date;

	@ApiProperty({ type: 'string', format: 'date-time' })
	updatedAt: Date;

	@ApiProperty({ type: UserDTO })
	initiator: UserDTO;

	@ApiProperty({ type: UserDTO })
	partner: UserDTO;

	@ApiProperty({ type: MessageDTO })
	lastMessage: MessageDTO;
}
