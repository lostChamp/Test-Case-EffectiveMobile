export namespace GetLogContract {

  export class Request {
    info: object;
  }
  export class Response {
    id: number;
    operation: string;
    created_at: Date;
    user: object;
  }
}
