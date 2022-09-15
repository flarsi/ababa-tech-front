import httpService from "../../app/httpService";
import { film } from "./types";

export async function createFilm(film: film) {
  return await httpService.post<any>({url: "/film", body: film})
}

export async function fetchFilms() {
  return await httpService.get<any>({url: "/film"})
}

export async function deleteFilm(id: number) {
  return await httpService.delete<any>({url: `/film/${id}`})
}