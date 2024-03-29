import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('v3 demo Docs')
    .setDescription('The Talk API description')
    .setVersion('1.0')
    .addTag('v3demo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(30000, '0.0.0.0');
}
bootstrap();
