import { Module } from '@nestjs/common';
import { V1Module } from './v1/v1.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    V1Module,
  ],
  controllers: [
    AppController,
  ]
})
export class AppModule {}
