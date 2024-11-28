import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { CadFuncionarioComponent } from './components/pages/cad-funcionario/cad-funcionario.component';
import { CadProdutoComponent } from './components/pages/cad-produto/cad-produto.component';
import { CadVendaComponent } from './components/pages/cad-venda/cad-venda.component';
import { SobreComponent } from './components/pages/sobre/sobre.component';
import { CarrinhoProdutoComponent } from './components/pages/carrinho-produto/carrinho-produto.component';
import { HomeAdminComponent } from './components/pages/home-admin/home-admin.component';
import { FuncDadosComponent } from './components/pages/func-dados/func-dados.component';
import { ProdDadosComponent } from './components/pages/prod-dados/prod-dados.component';
import { VendasDadosComponent } from './components/pages/vendas-dados/vendas-dados.component';
import { EditVendaComponent } from './components/pages/edit-venda/edit-venda.component';
import { TesteComponent } from './testes/teste/teste.component';
import { EditProdComponent } from './components/pages/edit-prod/edit-prod.component';
import { EditFuncComponent } from './components/pages/edit-func/edit-func.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { RoleGuardService as RoleGuard } from './auth/role-guard.service';
import { RecuperarSenhaComponent } from './components/pages/recuperar-senha/recuperar-senha.component';
import { EsqueceuSenhaComponent } from './components/pages/esqueceu-senha/esqueceu-senha.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'funcionarios',
    component: CadFuncionarioComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['ADMIN'] },
  },
  {
    path: 'funcionarios/:id',
    component: EditFuncComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['ADMIN'] },
  },
  {
    path: 'produtos',
    component: CadProdutoComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['ADMIN'] },
  },
  {
    path: 'produtos/:id',
    component: EditProdComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['ADMIN'] },
  },
  {
    path: 'vendas',
    component: CadVendaComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['FUNCIONARIO'] },
  },
  {
    path: 'vendas/:id',
    component: CadVendaComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['FUNCIONARIO'] },
  },
  {
    path: 'vendas/edit/:id',
    component: EditVendaComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['FUNCIONARIO'] },
  },
  { path: 'sobre', component: SobreComponent },
  {
    path: 'carrinho/:id/:codEditVenda/:idVenda',
    component: CarrinhoProdutoComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['FUNCIONARIO'] },
  },
  {
    path: 'home/area-administrativa',
    component: HomeAdminComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: ['ADMIN'],
    },
  },
  {
    path: 'home/funcionarios',
    component: FuncDadosComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['ADMIN'] },
  },
  {
    path: 'home/produtos',
    component: ProdDadosComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['ADMIN'] },
  },
  {
    path: 'home/vendas',
    component: VendasDadosComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['ADMIN'] },
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'testes',
    component: TesteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'recuperar-senha/:tokenTransparent',
    component: RecuperarSenhaComponent,
  },

  {
    path: 'esqueceu-senha',
    component: EsqueceuSenhaComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
