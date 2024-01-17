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
