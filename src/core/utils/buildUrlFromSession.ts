export default function (key:string): string {
    let url = '';

    const session = sessionStorage.getItem(key);
    if(session){
        const json = JSON.parse(session);
        if(typeof json === 'object'){
            for(let key in json) {
                url += `&${key}=${json[key]}`;
            }
        }
    }

    return url;
}