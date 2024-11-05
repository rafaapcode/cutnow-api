import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://cutnow-frontend.vercel.app'],
  });
  await app.listen(process.env.PORT, () => console.log('API RODANDO ...'));
}
bootstrap();
