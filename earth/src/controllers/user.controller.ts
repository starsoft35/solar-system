import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get, Param,
	Post, Query,
	UseInterceptors,
} from '@nestjs/common';
import { UserDto, PageDto } from '@solar-system/planet';
import { UserService } from '../services/user.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('user')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {

	constructor(private readonly srv: UserService) {
	}

	@Post('add')
	async addUser(@Body() user: UserDto) {
		await this.srv.save(user);
		return {
			result: true,
			code: 200,
			message: '添加人员成功',
		};
	}

	@Get(':id')
	getUserById(@Param('id') id: string) {
		return this.srv.getUserById(id);
	}

	@Get('/list')
	findUserForPage(@Query() params: PageDto) {
		return this.srv.findUserForPage(params.pageNum, params.pageSize);
	}

}
