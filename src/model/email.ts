import { gmail_v1 } from "googleapis";

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
  payload: gmail_v1.Schema$MessagePart;
}
