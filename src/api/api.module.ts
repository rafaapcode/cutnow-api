import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ServicesController } from './services/services.controller';
import { Services } from './services/services.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ServicesController],
  providers: [Services],
})
export class ApiModule {}
