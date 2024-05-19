import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
	constructor(private configService: ConfigService) {
		cloudinary.config({
			cloud_name: this.configService.get('CLOUDINARY_NAME'),
			api_key: this.configService.get('CLOUDINARY_API_KEY'),
			api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
		});
	}

	async uploadImage(imagePath: string) {
		const result = await cloudinary.uploader.upload(imagePath);
		return result.secure_url;
	}
}
