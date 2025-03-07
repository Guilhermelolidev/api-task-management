import { Request } from 'express';

export interface HttpRequest<TParams = Record<string, string>> {
  body?: Request['body'];
  query?: Request['query'];
  params?: TParams;
}
