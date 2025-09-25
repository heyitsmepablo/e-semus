import { ApiHideProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString } from 'class-validator';

export class AuthServiceSignInArgs {
  usuario: string;
  senha: string;
}

export class AuthServiceSignUpData {
  setor_area_cargo_id: number;
  nome: string;
  senha: string;
  matricula: string;
  email: string;
  cpf: string;
}

export class AuthSignUpDto {
  @IsInt()
  setor_area_cargo_id: number;
  @IsString()
  nome: string;
  @IsString()
  senha: string;
  @IsString()
  matricula: string;
  @IsEmail()
  email: string;
  @IsString()
  cpf: string;
}

export class AuthLoginDto {
  @IsString()
  usuario: string;
  @IsString()
  senha: string;
}
