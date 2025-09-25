import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UnidadeWhereQueryDto } from 'src/dtos/unidade.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UnidadeService } from 'src/services/unidade/unidade.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Acao, Modulo } from 'src/decorators/permission.decorator';
import { AuthzGuard } from 'src/guards/authz/authz.guard';
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('unidade')
export class UnidadeController {
  constructor(private readonly unidadeService: UnidadeService) {}

  /** Lista Todas as Unidades */
  @Modulo('unidade')
  @Acao('visualizar')
  @UseGuards(AuthzGuard)
  @Get()
  async findAll(@Query() where: UnidadeWhereQueryDto) {
    return await this.unidadeService.findAll(where);
  }
}
