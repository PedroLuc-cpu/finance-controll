import { api } from "@/lib/axios";
import { AxiosError } from "axios";

async function getGoogleInboxAPI() {
	try {
		return await api.get("/google/message/get");
	} catch (error) {
		if (error instanceof AxiosError && error.message) {
			alert(error.response?.data.message);
		}
	}
}

export const GoogleAPI = {
	getGoogleInboxAPI,
};
