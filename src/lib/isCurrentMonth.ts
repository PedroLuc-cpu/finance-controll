// Função para verificar se a data está no mês atual
export function isCurrentMonth(date: string) {
  const today = new Date();
  const boletoDate = new Date(date);
  return (
    boletoDate.getMonth() === today.getMonth() &&
    boletoDate.getFullYear() === today.getFullYear()
  );
}
