import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../common/guards/access_token.guard';
import { BarbershopsService } from './barbershops.service';

@Controller('barbershops')
export class BarbershopsController {
  constructor(private readonly barbershopServices: BarbershopsService) {}

  @Get(':id')
  @UseGuards(AccessTokenGuard)
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
