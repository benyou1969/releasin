import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypeModule } from 'modules/product-type/product-type.module';
import { ProductModule } from 'modules/product/product.module';
// import { __prod__ } from 'common/constants';
import { SnakeNamingStrategy } from 'utils';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        namingStrategy: new SnakeNamingStrategy(),
        entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
        // We are using migrations, synchronize should be set to false.
        synchronize: true,
        // Run migrations automatically,
        // you can disable this if you prefer running migration manually.

        // migrationsRun: true,
        // logging: __prod__ ? false : true,
        // logger: 'file',
        // // Allow both start:prod and start:dev to use migrations
        // // __dirname is either dist or src folder, meaning either
        // // the compiled js in prod or the ts in dev.
        // migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
        // cli: {
        //   // Location of migration should be inside src folder
        //   // to be compiled into dist/ folder.
        //   migrationsDir: 'src/migrations',
        // },

        // cache: {
        //   type: 'redis',
        //   duration: 6000,
        //   options: {
        //     url: configService.get('REDIS_URL'),
        //   },
        // },
      }),
      inject: [ConfigService],
    }),
    ProductModule,
    ProductTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
