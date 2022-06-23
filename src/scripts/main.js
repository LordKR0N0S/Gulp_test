const capitalizeName = (str) => {
  const personNameArray = str.split(' ');
  let resultArray = [];
  for(const i of personNameArray) {
    // First solution
    // resultArray.push(i[0].toUpperCase() + i.slice(1));
    // Second solution
    resultArray.push(i.replace(i[0], i[0].toUpperCase()));
  }
  str = resultArray.join(' ');
  return str;
}

console.log(capitalizeName('maxym drobot'));

console.log(add(3)(4));
console.log(car);

let x;
let y = 2;
x ??= y;
console.log(x);