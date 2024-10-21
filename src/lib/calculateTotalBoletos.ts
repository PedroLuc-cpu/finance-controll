import { Clientes } from "@/model/clientes";

// Função para calcular o valor total de boletos em um determinado intervalo
export function calculateTotalBoletos(
  clientes: Clientes[],
  dateChecker: (date: string) => boolean
) {
  return clientes.reduce((total, cliente) => {
    const totalCliente = cliente.boletos.reduce((subTotal, boleto) => {
      if (dateChecker(boleto.vencimento)) {
        return subTotal + boleto.valor;
      }
      return subTotal;
    }, 0);
    return total + totalCliente;
  }, 0);
}

// Função para arredondar valores para duas casas decimais
export function roundToTwoDecimalPlaces(value: number) {
  return Math.round(value * 100) / 100;
}
