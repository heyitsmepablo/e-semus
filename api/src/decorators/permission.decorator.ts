import { SetMetadata } from '@nestjs/common';

export const Modulo = (modulo: string) => SetMetadata('modulo', modulo);
export const Acao = (acao: 'visualizar' | 'criar' | 'editar' | 'deletar') =>
  SetMetadata('acao', acao);
