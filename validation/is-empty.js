/*
reason i had to create this isEMpty global method is becoz
isEmpty method provided with Validator module only works for 
string , and we need to check whether an object is empty or not
*/

const isEmpty = value =>
  value == undefined ||
  value == null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

module.exports = isEmpty;
