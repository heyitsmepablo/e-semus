import { Prisma } from 'generated/prisma';

export class JwTPayload implements Prisma.usuarioGetPayload<true> {
  id: string;
  matricula: string;
  unidade_lotada_id: number;
  setor_id: number;
  area_id: number | null;
  cargo_id: number;
  cargo: string;
  nome: string;
  cpf: string;
  email: string | null;
  criado_em: Date | null;
  atualizado_em: Date | null;
}
