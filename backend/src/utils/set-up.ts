import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TestingModule } from '@nestjs/testing';
import { __prod__ } from 'common/constants';
import * as morgan from 'morgan';
import { setupSwagger } from 'utils';

export const setupApp = (app: INestApplication) => {
  const configService = new ConfigService();
  app.enableCors({
    origin: configService.get('CORS_URL'),
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('v1');

  if (!__prod__) {
    app.use(morgan('tiny'));
  }
  setupSwagger(app);
};

export const createTestApp = async (
  moduleRef: TestingModule,
): Promise<INestApplication> => {
  const app = moduleRef.createNestApplication();
  setupApp(app);
  return await app.init();
};
