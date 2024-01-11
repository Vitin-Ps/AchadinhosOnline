import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

import { AppModule } from './app/app.module';
import { registerLocaleData } from '@angular/common';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
