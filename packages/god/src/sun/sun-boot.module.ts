import { DynamicModule, HttpModule, HttpService, Module } from '@nestjs/common';
import { SunBootService } from './sun-boot.service';
import { SunBootModuleOptions } from '../interfaces';
import { SunClient } from './sun.client';
import { SUN_BOOT_OPTIONS, SUN_CLIENT_SERVICE } from './constants';

@Module({
	imports: [],
	providers: [
		{
			provide: SUN_CLIENT_SERVICE,
			useFactory: async (http: HttpService) => {
				return new SunClient(http.axiosRef);
			},
			inject: [HttpService],
		},
		SunBootService,
		{
			provide: SUN_BOOT_OPTIONS,
			useValue: {
				sun: process.env.SUN,
				service: {},
				http: {
					baseURL: process.env.SUN,
				},
			} as SunBootModuleOptions,
		},
	],
	exports: [
		SUN_CLIENT_SERVICE,
	],
})
export class SunBootModule {
	static register(config: SunBootModuleOptions): DynamicModule {
		return {
			module: SunBootModule,
			imports: [
				HttpModule.register(config.http),
			],
			providers: [
				{
					provide: SUN_BOOT_OPTIONS,
					useValue: config,
				},
			],
			exports: [],
		};
	}
}
