import { NestFactory } from '@nestjs/core';
import { AppModule } from '@resources/app.module';
import { ConfigService } from '@nestjs/config';
import { CommonConfigs, RedisConfigs } from '@core/types';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { port } = app.get(ConfigService).get<CommonConfigs>('common');
  const { host, port: redisPort } = app
    .get(ConfigService)
    .get<RedisConfigs>('redis');

  const connectOptions: MicroserviceOptions = {
    transport: Transport.REDIS,
    options: {
      host,
      port: redisPort,
    },
  };

  app.connectMicroservice<MicroserviceOptions>(connectOptions, {
    inheritAppConfig: true,
  });

  await app.startAllMicroservices();

  await app.listen(port, async () =>
    console.log(`app was running on ${await app.getUrl()}`),
  );
}
bootstrap();
