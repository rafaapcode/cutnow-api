import { Controller, Get, Param } from '@nestjs/common';
import { BarbershopsService } from './barbershops.service';

@Controller('barbershops')
export class BarbershopsController {
  constructor(private readonly barbershopServices: BarbershopsService) {}

  @Get(':id')
  async getBarbershopInfo(@Param('id') id: string) {
    if (!id) {
      return {
        data: null,
      };
    }
    const info = await this.barbershopServices.getBarbershopInfo(id);
    return {
      data: info,
    };
  }
}
