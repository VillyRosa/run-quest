import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { EnvironmentProviders, importProvidersFrom, inject, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core';
import { LanguageService } from '../shared/services/language.service';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const provideTranslation = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'pt',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    provideEnvironmentInitializer(() => {
      const languageService = inject(LanguageService);
      languageService.initLanguage();
    })
  ]);
}
