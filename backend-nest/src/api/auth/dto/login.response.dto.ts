import { ApiProperty } from '@nestjs/swagger';

export default class LoginResponseDTO {
	@ApiProperty({ type: 'string', description: 'JWT token.', required: true })
	token: string;
}
