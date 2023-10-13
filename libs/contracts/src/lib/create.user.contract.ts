
export namespace CreateUserContract {
  export class Request {
    name: string;
    email: string;
  }

  export class Response{
    name?: string;
    email?: string;
    createdAt?: Date;
    msg?: object;
  }
}
