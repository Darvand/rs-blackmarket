import { envVariables, envVariablesValidations } from '@main/shared/config';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const sharedTestingConfig = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [envVariables],
    validationSchema: envVariablesValidations,
  }),
  TypeOrmModule.forRootAsync({
    inject: [envVariables.KEY],
    useFactory: (configService: ConfigType<typeof envVariables>) => {
      const { host, port, username, password } = configService.database;
      const options: TypeOrmModuleOptions = {
        type: 'postgres',
        synchronize: true,
        entities: ['src/**/*.entity{.ts,.js}'],
        database: 'test',
        host,
        port,
        username,
        password,
      };
      return options;
    },
  }),
];
