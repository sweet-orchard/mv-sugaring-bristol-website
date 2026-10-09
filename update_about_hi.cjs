const fs = require('fs');
const path = './src/content/site.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newKeys = {
  "NEW_ABOUT_P1_HI": "Hi,",
  "NEW_ABOUT_P1": " I'm Mariia. There are three things you should know about me."
};

Object.keys(data).forEach(lang => {
  Object.assign(data[lang], newKeys);
});

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Successfully updated site.json for Hi,');
