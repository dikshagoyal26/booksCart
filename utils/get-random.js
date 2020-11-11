function getRandomId(length) {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let charLen = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(characters.length * Math.random());
  }
  return result;
}
module.exports = getRandomId;
