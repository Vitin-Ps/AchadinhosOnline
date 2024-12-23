import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { EditFuncComponent } from './components/pages/edit-func/edit-func.component';
import { LoginComponent } from './components/pages/login/login.component';
import { Interceptor } from './interceptor/Interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { LoadingComponent } from './components/loading/loading.component';
import { CardItemCarrinhoComponent } from './components/cards/card-item-carrinho/card-item-carrinho.component';
import { RecuperarSenhaComponent } from './components/pages/recuperar-senha/recuperar-senha.component';
import { EsqueceuSenhaComponent } from './components/pages/esqueceu-senha/esqueceu-senha.component';

const serviceAutentica = [Interceptor];

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
  
   EditFuncComponent,
    LoginComponent,
    LoadingComponent,
    CardItemCarrinhoComponent,
    RecuperarSenhaComponent,
    EsqueceuSenhaComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    provideClientHydration(),
    serviceAutentica,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
