import { Controller, Get, Param } from '@nestjs/common';
import { Services } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly services: Services) {}

  @Get(':id')
  async getAllServices(@Param('id') id: string) {
    if (!id) {
      return {
        data: null,
      };
    }
    const allservices = await this.services.getBarbershopServices(id);
    return {
      data: allservices,
    };
  }
}
