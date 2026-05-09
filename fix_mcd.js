const fs = require('fs');
let c = fs.readFileSync('app/dashboard/page.tsx', 'utf8');
// Using indexOf and slice to find and replace without any apostrophe in this script
let result = '';
let searchStr = 'McDonald';
let idx = 0;
while (idx < c.length) {
  let found = c.indexOf(searchStr, idx);
  if (found === -1) { result += c.slice(idx); break; }
  result += c.slice(idx, found + searchStr.length);
  let after = c[found + searchStr.length];
  // If next char is apostrophe (char 39) or smart quote (char 8217) followed by s
  let code = c.charCodeAt(found + searchStr.length);
  if ((code === 39 || code === 8217) && c[found + searchStr.length + 1] === 's') {
    result += 's';
    idx = found + searchStr.length + 2;
  } else {
    idx = found + searchStr.length;
  }
}
fs.writeFileSync('app/dashboard/page.tsx', result);
// Verify
let verify = fs.readFileSync('app/dashboard/page.tsx', 'utf8');
let bad = false;
for (let i = 0; i < verify.length; i++) {
  if (verify.slice(i, i+8) === 'McDonald') {
    let code = verify.charCodeAt(i+8);
    if (code === 39 || code === 8217) { bad = true; console.log('Still bad at:', i); }
  }
}
console.log(bad ? 'STILL HAS APOSTROPHE!' : 'All clean! No apostrophes found.');
