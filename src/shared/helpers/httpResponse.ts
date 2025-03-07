import { HttpResponse } from '../types/httpResponse';

export function httpResponse<T>(statusCode: number, body: T): HttpResponse {
  return {
    statusCode,
    body,
  };
}
