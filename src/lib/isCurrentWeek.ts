// Função para verificar se a data está na semana atual
export function isCurrentWeek(date: string) {
  const today = new Date();
  const boletoDate = new Date(date);
  const weekStart = new Date(today.setDate(today.getDate() - today.getDay())); // Início da semana
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6); // Fim da semana
  return boletoDate >= weekStart && boletoDate <= weekEnd;
}
