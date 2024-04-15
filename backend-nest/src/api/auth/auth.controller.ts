import { Body, Controller, Post } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiUnauthorizedResponse, ApiOperation } from '@nestjs/swagger';
import { ExceptionResponseDto } from '#common/dto';
import { AuthService } from './auth.service';
import { LoginRequestDTO, LoginResponseDTO } from './dto';
import { Public } from './guards/public.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/sign-in')
	@Public()
	@ApiOperation({ description: 'Log in and get JWT token.' })
	@ApiOkResponse({
		description: 'Signed in successfully.',
		type: LoginResponseDTO,
	})
	@ApiUnauthorizedResponse({
		description: 'Invalid token.',
		type: ExceptionResponseDto,
	})
	public async login(@Body() data: LoginRequestDTO): Promise<LoginResponseDTO> {
		const { token } = await this.authService.login(data.email, data.password);
		try {
			return { token };
		} catch (err) {
			throw new UnauthorizedException('Invalid token');
		}
	}

	public async register(@Body() data: any): Promise<any> {
		return await this.authService.register(data);
	}
}
