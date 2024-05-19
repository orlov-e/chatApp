import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiUnauthorizedResponse, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { ExceptionResponseDto, SuccessResponseDto } from '#common/dto';
import { AuthService } from './auth.service';
import { LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO } from './dto';
import { Public } from './guards/public.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/login')
	@Public()
	@ApiOperation({ description: 'Log in and get JWT token.' })
	@HttpCode(200)
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
		return { token };
	}

	@Post('/register')
	@Public()
	@ApiOperation({ description: 'Register a new user.' })
	@HttpCode(201)
	@ApiCreatedResponse({
		description: 'User registered successfully.',
		type: SuccessResponseDto,
	})
	@ApiUnauthorizedResponse({
		description: 'User already exists.',
		type: ExceptionResponseDto,
	})
	public async register(@Body() data: RegisterRequestDTO) {
		console.log(data);
		await this.authService.register(data);
		return { message: 'User registered successfully.' };
	}

	@Public()
	@Post('/logout')
	@ApiOperation({ description: 'Log out the current user.' })
	@HttpCode(200)
	@ApiOkResponse({
		description: 'Logged out successfully.',
		type: SuccessResponseDto,
	})
	public async logout() {
		console.log('logout');
		return { message: 'User logged out successfully.' };
	}
}
