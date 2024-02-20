import {infoToken} from './TokenService';

// Função para verificar se o usuário é administrador
export function isAdmin(token: string) {
  if (token) {
    const decodedToken = infoToken(token);
    return decodedToken!.role === 'ADMIN';
  }
  return false;
}

// Função para verificar se o usuário é funcionário
export function isFuncionario(token: string) {
  if (token) {
    const decodedToken = infoToken(token);
    return decodedToken!.role === 'FUNCIONARIO' || decodedToken!.role === 'ADMIN';
  }
  return false;
}
