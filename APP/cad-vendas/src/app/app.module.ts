import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CadFuncionarioComponent } from './components/pages/cad-funcionario/cad-funcionario.component';
import { CadVendaComponent } from './components/pages/cad-venda/cad-venda.component';
import { CadProdutoComponent } from './components/pages/cad-produto/cad-produto.component';
import { SobreComponent } from './components/pages/sobre/sobre.component';
import { FormFuncComponent } from './components/forms/form-func/form-func.component';
import { MensagensComponent } from './components/mensagens/mensagens.component';
import { FormProdutoComponent } from './components/forms/form-produto/form-produto.component';
import { CarrinhoProdutoComponent } from './components/pages/carrinho-produto/carrinho-produto.component';
import { FormVendaComponent } from './components/forms/form-venda/form-venda.component';
import { HomeAdminComponent } from './components/pages/home-admin/home-admin.component';
import { FuncDadosComponent } from './components/pages/func-dados/func-dados.component';
import { VendasDadosComponent } from './components/pages/vendas-dados/vendas-dados.component';
import { ProdDadosComponent } from './components/pages/prod-dados/prod-dados.component';
import { CardFuncionalidadeComponent } from './components/cards/card-funcionalidade/card-funcionalidade.component';
import { CardVendaComponent } from './components/cards/card-venda/card-venda.component';
import { CardFuncComponent } from './components/cards/card-func/card-func.component';
import { ConversaoMoedaReal } from './pipes/ConversaoMoedaReal.pipe';
import { EditVendaComponent } from './components/pages/edit-venda/edit-venda.component';
import { EditProdComponent } from './components/pages/edit-prod/edit-prod.component';
import { CardProdComponent } from './components/cards/card-prod/card-prod.component';
import { ManipulacaoDivComponent } from './testes/components/manipulacao-div/manipulacao-div.component';
import { TesteComponent } from './testes/teste/teste.component';
import { ManipularDivsDinamicasComponent } from './testes/components/manipular-divs-dinamicas/manipular-divs-dinamicas.component';
import { RadioComponent } from './testes/components/radio/radio.component';
import { EditFuncComponent } from './components/pages/edit-func/edit-func.component';
import { CicloVidaComponent } from './testes/components/ciclo-vida/ciclo-vida.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CadFuncionarioComponent,
    CadVendaComponent,
    CadProdutoComponent,
    SobreComponent,
    FormFuncComponent,
    MensagensComponent,
    FormProdutoComponent,
    CarrinhoProdutoComponent,
    FormVendaComponent,
    HomeAdminComponent,
    FuncDadosComponent,
    VendasDadosComponent,
    ProdDadosComponent,
    CardFuncionalidadeComponent,
    CardVendaComponent,
    CardFuncComponent,
    ConversaoMoedaReal,
    EditVendaComponent,
    EditProdComponent,
    CardProdComponent,
    ManipulacaoDivComponent,
    TesteComponent,
    ManipularDivsDinamicasComponent,
    RadioComponent,
    EditFuncComponent,
    CicloVidaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
