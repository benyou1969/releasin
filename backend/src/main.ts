import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { AppModule } from 'modules/app/app.module';
import { setupApp } from 'utils';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      // logger: __prod__ ? false : true, //! set it as production mode
    },
  );
  const configService = app.get(ConfigService);
  app.set('trust proxy', 1);

  setupApp(app);

  await app.listen(parseInt(configService.get('PORT')));
}
bootstrap();
