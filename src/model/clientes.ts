interface Endereco {
	rua: string;
	numero: string;
	bairro: string;
	cidade: string;
	estado: string;
	cep: string;
}

interface boleto {
	id: string;
	valor: number;
	vencimento: string;
	status: string;
}

export interface Clientes {
	id: string;
	nome: string;
	email: string;
	status: string;
	telefone: string[];
	endereco: Endereco[];
	boletos: boleto[];
}
