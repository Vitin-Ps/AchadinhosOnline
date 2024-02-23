import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SobreComponent } from './components/pages/sobre/sobre.component';
import { CadFuncionarioComponent } from './components/pages/cad-funcionario/cad-funcionario.component';
import { CadProdutoComponent } from './components/pages/cad-produto/cad-produto.component';
import { CadVendaComponent } from './components/pages/cad-venda/cad-venda.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFuncionarioComponent } from './components/forms/form-funcionario/form-funcionario.component';
import { MessageComponent } from './components/message/message.component';
import { FormProdutoComponent } from './components/forms/form-produto/form-produto.component';
import { FormVendaComponent } from './components/forms/form-venda/form-venda.component';
import { CarrinhoProdutoComponent } from './components/pages/carrinho-produto/carrinho-produto.component';
import { ConversaoMoedaRealPipe } from './pipes/conversao-moeda-real.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { HomeAdminComponent } from './components/pages/home-admin/home-admin.component';
import { CardFuncionalidadeComponent } from './components/cards/card-funcionalidade/card-funcionalidade.component';
import { DadosProdutoComponent } from './components/pages/dados-produto/dados-produto.component';
import { CardProdutoComponent } from './components/cards/card-produto/card-produto.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SobreComponent,
    CadFuncionarioComponent,
    CadProdutoComponent,
    CadVendaComponent,
    FormFuncionarioComponent,
    MessageComponent,
    FormProdutoComponent,
    FormVendaComponent,
    CarrinhoProdutoComponent,
    ConversaoMoedaRealPipe,
    LoadingComponent,
    HomeAdminComponent,
    CardFuncionalidadeComponent,
    DadosProdutoComponent,
    CardProdutoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
