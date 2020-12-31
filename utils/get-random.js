function getRandomId(length) {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(characters.length * Math.random());
  }
  return result;
}
function getRandomOrderId(length) {
  let result = "";
  let numbers = "1234567890";
  let charLen = numbers.length;
  for (let i = 0; i < 3; i++) {
    result += numbers.charAt(numbers.length * Math.random());
  }
  result += "-";
  for (let i = 0; i < length; i++) {
    result += numbers.charAt(numbers.length * Math.random());
  }
  return result;
}
module.exports = { getRandomOrderId, getRandomId };
