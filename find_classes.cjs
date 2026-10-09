const fs = require('fs');
const glob = require('glob');

glob('src/components/*.jsx', (err, files) => {
  if (err) throw err;
  const classes = new Set();
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/<p className="([^"]+)"/g);
    if (matches) {
      matches.forEach(m => classes.add(m));
    }
    const h2Matches = content.match(/<h2 className="([^"]+)"/g);
    if (h2Matches) h2Matches.forEach(m => classes.add(m));
    const h3Matches = content.match(/<h3 className="([^"]+)"/g);
    if (h3Matches) h3Matches.forEach(m => classes.add(m));
  });
  console.log(Array.from(classes).join('\n'));
});
