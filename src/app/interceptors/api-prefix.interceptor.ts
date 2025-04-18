import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const apiPrefixInterceptor: HttpInterceptorFn = (req, next) => {
  const isFullUrl = req.url.startsWith('http');
  const isAsset = req.url.includes('assets');

  const apiReq = (isFullUrl || isAsset) ? req : req.clone({
    url: `${environment.api.replace(/\/$/, '')}/${req.url.replace(/^\//, '')}`
  });

  return next(apiReq);
};
