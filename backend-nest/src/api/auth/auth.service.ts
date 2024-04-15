import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '#src/api/users/users.service';
import Password from '#common/utils/password';
import { RegisterRequestDTO } from './dto';

@Injectable()
export class AuthService {
	private readonly JWT_SECRET: string;
	private readonly JWT_TOKEN_EXPIRES_IN = '30d';

	constructor(
		private readonly configService: ConfigService,
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {
		this.JWT_SECRET = this.configService.getOrThrow('JWT_TOKEN_SECRET');
	}

	public async login(email: string, password: string) {
		const user = await this.usersService.getByEmail(email);
		if (!(await Password.compare(user.password, password))) throw new Error('Invalid credentials');

		const token = await this.jwtService.signAsync(
			{ email, id: user.id },
			{
				secret: this.JWT_SECRET,
				expiresIn: this.JWT_TOKEN_EXPIRES_IN,
			},
		);
		return { token };
	}

	public async register(data: RegisterRequestDTO) {
		const userExists = await this.usersService.getByEmail(data.email);
		if (userExists) throw new Error('User already exists');

		const hashedPassword = await Password.toHash(data.password);
		return await this.usersService.create({ ...data, password: hashedPassword });
	}
}
