import { ApiProperty } from '@nestjs/swagger';

export class CreateDialogDTO {
	@ApiProperty({
		type: 'number',
		description: 'Partner id.',
		required: true,
	})
	partnerId: number;

	@ApiProperty({
		type: 'string',
		description: 'First message.',
		required: true,
	})
	text: string;
}
