import type { $Fetch, NitroFetchRequest } from "nitropack";
import type Order from "~/models/Order";
import type Piece from "~/models/Piece";

export const figuresRepository = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
	async getFigures(){
        return fetch<Order[]>("/figures");
    },
	async getFigure(id: string){
        return fetch<Piece>(`/figures/${id}`);
    }
});
