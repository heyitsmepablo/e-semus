import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RbacService } from 'src/services/rbac/rbac.service';

@Injectable()
export class AuthzGuard implements CanActivate {
  constructor(
    private reflactor: Reflector,
    private rbac: RbacService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.usuario;
    const modulo = this.reflactor.get<string>('modulo', context.getHandler());
    const acao = this.reflactor.get<
      'visualizar' | 'criar' | 'editar' | 'deletar'
    >('acao', context.getHandler());
    if (!user || !modulo || !acao) return false;
    return await this.rbac.can(user.id, modulo, acao);
  }
}
