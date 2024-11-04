export interface Produto {
	// Informações Básicas
	id: string;
	nome: string;
	descricao: string;
	categoria: string;
	codigoBarras: string; // Código EAN ou similar
	marca: string;

	// Informações de Tributação
	ncm: string; // Nomenclatura Comum do Mercosul
	cest?: string; // Código Especificador da Substituição Tributária
	cfop: string; // Código Fiscal de Operações e Prestações
	origem: string; // Origem do Produto (ex: 0-Nacional, 1-Estrangeiro, etc.)
	aliquotaICMS: number; // Alíquota do ICMS
	aliquotaIPI?: number; // Alíquota do IPI (se aplicável)
	aliquotaPIS: number;
	aliquotaCOFINS: number;

	// Informações do Fornecedor
	fornecedor: {
		id: string;
		nome: string;
		cnpj: string;
		endereco: string;
		telefone: string;
	};

	// Informações de Estoque
	unidadeMedida: string; // Unidade de medida (ex: "kg", "unidade")
	quantidadeEstoque: number;
	precoCusto: number;
	precoVenda: number;
	dataValidade?: Date; // Para produtos perecíveis

	// Informações de Controle de Qualidade
	lote?: string;
	dataFabricacao?: Date;
	certificadoINMETRO?: string; // Para produtos que precisam de certificação

	// Informações Regulamentares (se aplicável)
	registroANVISA?: string; // Para produtos regulados pela ANVISA (ex: medicamentos, cosméticos)
	avisoLegal?: string; // Avisos obrigatórios no rótulo, se houver

	// Outros
	pesoBruto?: number; // Peso do produto com embalagem
	pesoLiquido?: number; // Peso do produto sem embalagem
	dimensoes?: {
		altura: number;
		largura: number;
		profundidade: number;
	};
	tags?: string[]; // Tags ou palavras-chave que identificam o produto
}
