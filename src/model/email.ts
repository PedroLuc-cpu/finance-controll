interface Headers {
  name: string;
  value: string;
}
interface Body {
  size: number;
  data: string;
}
interface Payload {
  partId: string;
  mineType: string;
  filename: string;
  headers: Headers[];
  body: Body;
}

export interface Email {
  id: string;
  snippet: string;
  payload: Payload;
}
