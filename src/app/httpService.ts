type requestParamsTypes = {
    url: string,
    headers?: {[key: string] : string},
    queryParams?: {[key: string] : any}
}

interface getParamsTypes extends requestParamsTypes {} 
interface postParamsTypes extends requestParamsTypes {
    body: {[key: string] : any}
} 
interface putParamsTypes extends requestParamsTypes {
    body: {[key: string] : any}
} 
interface updateParamsTypes extends requestParamsTypes {
    body: {[key: string] : any}
} 
interface patchParamsTypes extends requestParamsTypes {
    body: {[key: string] : any}
} 
interface deleteParamsTypes extends requestParamsTypes {} 

export class HttpService {
    constructor(baseUrl: string, baseRequestInit: RequestInit) {
        this.baseUrl = baseUrl;
        this.baseRequestInit = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem("token") || ''
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            ...baseRequestInit
          }
    }

   private baseUrl: string;
   public baseRequestInit: RequestInit;
   private lastResponse: Response | null = null

   private paramsToString(params: {[key: string] : string} | undefined): string {
    let paramsString: string = '';

    if(params){
        paramsString = '?'
        Object.keys(params).forEach((key, index, arr) => {
            let value = params[key]
            if(value) {
                paramsString += `${key}=${value}`
            }
            if(arr.length - 1 > index) {
                paramsString += '&'
            }
        })
    }
        return paramsString;
   }

   getLastResponse = () => this.lastResponse
   private setLastResponse = ((res: Response): Promise<any> => {
    this.lastResponse = res
    return res.json()
   })
   

    get = async <T>(params: getParamsTypes): Promise<T | {[key: string]: any}> => {
        const queryParams = this.paramsToString(params.queryParams)

        return fetch(this.baseUrl + params.url + queryParams, {...this.baseRequestInit, method: "GET"})
        .then(this.setLastResponse)
        .then(data => data)
    }
    
    post = async <T>(params:postParamsTypes): Promise<T | {[key: string]: any}> => {
        const queryParams = this.paramsToString(params.queryParams)

        return fetch(this.baseUrl + params.url + queryParams, {...this.baseRequestInit, method: "POST", body: JSON.stringify(params.body)})
        .then(this.setLastResponse)
        .then(data => data)

    }

    put = async <T>(params:putParamsTypes): Promise<T | {[key: string]: any}> => {
        const queryParams = this.paramsToString(params.queryParams)

        return fetch(this.baseUrl + params.url + queryParams, {...this.baseRequestInit, method: "PUT", body: JSON.stringify(params.body)})
        .then(this.setLastResponse)
        .then(data => data)

    }

    update = async <T>(params:updateParamsTypes): Promise<T | {[key: string]: any}> => {
        const queryParams = this.paramsToString(params.queryParams)

        return fetch(this.baseUrl + params.url + queryParams, {...this.baseRequestInit, method: "UPDATE", body: JSON.stringify(params.body)})
        .then(this.setLastResponse)
        .then(data => data)

    }

    patch = async <T>(params:patchParamsTypes): Promise<T | {[key: string]: any}> => {
        const queryParams = this.paramsToString(params.queryParams)

        return fetch(this.baseUrl + params.url + queryParams, {...this.baseRequestInit, method: "PATCH", body: JSON.stringify(params.body)})
        .then(this.setLastResponse)
        .then(data => data)
    }

    delete = async <T>(params:deleteParamsTypes): Promise<T | {[key: string]: any}> => {
        const queryParams = this.paramsToString(params.queryParams)

        return fetch(this.baseUrl + params.url + queryParams, {...this.baseRequestInit, method: "DELETE"})
        .then(this.setLastResponse)
        .then(data => data)
    }

    fetch = async (url: string, params?: RequestInit): Promise<Response> => fetch(url, params)
}

export default new HttpService("http://localhost:3001", {})