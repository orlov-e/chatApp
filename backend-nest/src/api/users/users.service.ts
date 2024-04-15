import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async findOne(id: number): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: { id },
		});
		if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
		return user;
	}

	async getByEmail(email: string): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: { email },
		});
		if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
		return user;
	}

	async create(data: any): Promise<User> {
		const user = await this.prisma.user.create({
			data: data,
		});
		return user;
	}
}
