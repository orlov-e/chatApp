import { ApiProperty } from '@nestjs/swagger';

export default class SuccessResponseDto {
	@ApiProperty({
		type: 'string',
		description: 'Success instance type.',
		required: true,
	})
	message: string;
}
