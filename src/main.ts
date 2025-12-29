import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { corsConfiguration } from './config/cors-configuration';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: corsConfiguration,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableShutdownHooks();

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.useStaticAssets(join(__dirname, '..', 'assets'));

  await app.listen(process.env.PORT || 8080, () => {
    new Logger().log(`API is started on PORT ${process.env.PORT || 3080}...`);
  });
}
bootstrap();
