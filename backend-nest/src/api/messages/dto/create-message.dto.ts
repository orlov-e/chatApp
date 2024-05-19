import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
	@ApiProperty({
		type: 'string',
		description: 'Message text.',
		required: true,
	})
	text: string;

	@ApiProperty({
		type: 'string',
		description: 'Dialog id.',
		required: true,
	})
	dialogId: number;
}
