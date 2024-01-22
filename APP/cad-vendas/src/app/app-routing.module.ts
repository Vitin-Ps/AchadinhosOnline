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
import { ManipulacaoDivComponent } from './testes/components/manipulacao-div/manipulacao-div.component';
import test from 'node:test';
import { TesteComponent } from './testes/teste/teste.component';
import { EditProdComponent } from './components/pages/edit-prod/edit-prod.component';
import { EditFuncComponent } from './components/pages/edit-func/edit-func.component';


const routes: Routes = [
  // {path:"", component:HomeComponent},
  {path:"", component:HomeComponent},
  {path:"funcionarios", component:CadFuncionarioComponent},
  {path:"funcionarios/:id", component:EditFuncComponent},
  {path:"produtos", component:CadProdutoComponent},
  {path:"produtos/:id", component:EditProdComponent},
  {path:"vendas", component:CadVendaComponent},
  {path:"vendas/:id", component:CadVendaComponent},
  {path:"vendas/edit/:id", component:EditVendaComponent},
  {path:"sobre", component:SobreComponent},
  {path:"carrinho-produtos/:id", component:CarrinhoProdutoComponent},
  {path:"home/area-administrativa", component:HomeAdminComponent},
  {path:"home/funcionarios", component: FuncDadosComponent},
  {path:"home/produtos", component:ProdDadosComponent},
  {path:"home/vendas", component:VendasDadosComponent},
  {path:"testes", component:TesteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
