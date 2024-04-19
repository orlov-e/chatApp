import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
	constructor(private readonly db: PrismaService) {}

	async findOne(id: number): Promise<Omit<User, 'password'> & { fullName: string }> {
		const user = await this.db.user.findUnique({
			where: { id },
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				last_seen: true,
				avatar: true,
			},
		});
		if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
		const fullName = `${user.firstName} ${user.lastName}`;
		return { ...user, fullName };
	}

	async getByEmail(email: string): Promise<User> {
		const user = await this.db.user.findUnique({
			where: { email: email },
		});
		return user;
	}

	async create(data: CreateUserDto): Promise<User> {
		const user = await this.db.user.create({
			data: data,
		});
		return user;
	}
}
