
export namespace EditUserContract {
  export class Request {
    info: object;
  }

  export class Response{
    id?: number;
    name?: string;
    email?: string;
    msg?: object;
  }
}
