import httpService from "../../app/httpService";
import { logInPayload, signUpPayload } from "./types";

export async function logIn(payload: logInPayload) {
    const response = await httpService.fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers:{ "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    const token = response.headers.get("Authorization")
    if(token){
      localStorage.setItem('token', token);
      httpService.baseRequestInit.headers = {...httpService.baseRequestInit.headers, "Authorization" : token}
    }
    return await response.json().then(data => data)
  }

  export async function SignUp(payload: signUpPayload) {
    const response = await httpService.fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers:{ "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    const token = response.headers.get("Authorization")
    if(token){
      localStorage.setItem('token', token);

    }
    return await response.json().then(data => data)
  }

  export async function Me() {
    return await httpService.get<any>({url: "/auth/me"})
  }