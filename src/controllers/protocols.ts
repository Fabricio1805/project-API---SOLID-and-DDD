export interface HttpResponse<T>{
  statusCode: HttpStatusCode;
  body: T;
}

export interface HttpRequest<B>{
  params?: any;
  headers?: any;
  body?: B;
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BADREQUEST = 400,
  SERVER = 500
}
export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
