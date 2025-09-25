import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class RbacService {
  #db = PrismaSingleton.instance.client;

  async can(
    usuarioId: string,
    moduloNome: string,
    acao: 'visualizar' | 'criar' | 'editar' | 'deletar',
  ): Promise<boolean> {
    const user: Prisma.usuarioGetPayload<{
      select: {
        setor_area_cargo: {
          select: {
            controle_rbac: {
              select: {
                visualizar: true;
                criar: true;
                editar: true;
                deletar: true;
              };
            };
          };
        };
      };
    }> | null = await this.#db.usuario.findUnique({
      where: { id: usuarioId },
      select: {
        setor_area_cargo: {
          select: {
            controle_rbac: {
              where: { modulo: { nome: moduloNome } },
              select: {
                visualizar: true,
                criar: true,
                editar: true,
                deletar: true,
              },
            },
          },
        },
      },
    });

    if (user?.setor_area_cargo?.controle_rbac.length) return false;

    const permission = user?.setor_area_cargo?.controle_rbac[0];

    return permission?.[acao] ?? false;
  }
}
