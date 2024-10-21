import { Clientes } from "./clientes";

export interface Pedidos {
  cliente: Clientes;
  tipo: "Reembolso" | "Subscrição" | "Oferta";
  status: "Cumprido" | "Recusado" | "Cancelado";
  data: string;
  quantia: number;
}
