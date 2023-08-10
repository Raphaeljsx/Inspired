export function serialize(obj){
  let queryStr = '';
  for(let key in obj){
    queryStr += `&${key}=${obj[key]}`;
  }
  return queryStr;
}
export function validaEmail(email) {
  const emailRegex =  /^([a-zA-Z][^<>"!@[\]#$%¨&*()~^:;ç,\-´`=+{}º/\\?]{1,})@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(String(email).toLowerCase())
}

