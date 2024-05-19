import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

/**
 * Decorator for controllers' methods
 * Extracts user id from verified JWT token payloads.
 */
const UserId = createParamDecorator((data: string[], ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();
	const id = request.user.id;
	console.log('createParamDecorator', id);
	if (!id) throw new UnauthorizedException('Invalid token payload!');
	return parseInt(id);
});

export default UserId;
