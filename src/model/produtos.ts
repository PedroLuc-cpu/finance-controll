export interface Produto {
  id: number; // Identificador único do produto
  name: string; // Nome do produto
  description: string; // Descrição do produto
  price: number; // Preço do produto
  category: string; // Categoria do produto
  inStock: boolean; // Indica se o produto está em estoque
  createdAt: Date; // Data de criação do produto
  updatedAt: Date; // Data da última atualização do produto
}
