import { Mails } from "@/model/email";
import { atom, useAtom } from "jotai";

type Config = {
	selected: Mails["id"] | null;
};

// Função para criar o atom com `inbox` como parâmetro
export function createConfigAtom(inbox: Mails[]) {
	return atom<Config>({
		selected: inbox && inbox.length > 0 ? inbox[0].id : null,
	});
}

export function useMail(inbox: Mails[]) {
	const configAtom = createConfigAtom(inbox);
	return useAtom(configAtom);
}
