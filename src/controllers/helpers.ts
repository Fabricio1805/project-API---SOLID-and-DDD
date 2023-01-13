import { HttpResponse, HttpStatusCode } from './protocols';

export const ok = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: HttpStatusCode.OK,
    body,
  };
};

export const created = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: HttpStatusCode.CREATED,
    body,
  };
};


export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.BADREQUEST,
    body: message,
  };
};


export const server = (): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.SERVER,
    body: 'Internal server error',
  };
};
