export function serialize(obj){
  let queryStr = '';
  for(let key in obj){
    queryStr += `&${key}=${obj[key]}`;
  }
  return queryStr;
}