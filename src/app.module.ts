import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { envVariables, envVariablesValidations } from './shared/config';

@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envVariables],
      validationSchema: envVariablesValidations,
    }),
    TypeOrmModule.forRootAsync({
      inject: [envVariables.KEY],
      useFactory: (configService: ConfigType<typeof envVariables>) => {
        const { host, port, username, password, database } =
          configService.database;
        const options: TypeOrmModuleOptions = {
          type: 'postgres',
          synchronize: false,
          entities: ['dist/**/*{.entity.ts,.entity.js}'],
          host,
          port,
          username,
          password,
          database,
        };
        return options;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule],
})
export class AppModule {}
