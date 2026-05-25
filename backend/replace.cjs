const fs = require('fs');
let data = fs.readFileSync('src/pages/Results.jsx', 'utf8');
let count = 0;
data = data.replace(/price: "₹[0-9.]+"/g, () => {
  count++;
  if (count % 3 === 1 || count % 3 === 2) return 'price: "₹450.00"';
  return 'price: "₹500.00"';
});
fs.writeFileSync('src/pages/Results.jsx', data);
