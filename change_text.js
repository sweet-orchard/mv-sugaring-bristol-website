import fs from 'fs';
let siteJson = JSON.parse(fs.readFileSync('src/content/site.json', 'utf8'));

siteJson.en['COURSES_LEARN_MORE_BTN'] = 'Contact me for more info';
// Let's also set a sensible Ukrainian translation if possible, or just leave it for now.
siteJson.uk['COURSES_LEARN_MORE_BTN'] = 'Зв\'яжіться зі мною для деталей';

fs.writeFileSync('src/content/site.json', JSON.stringify(siteJson, null, 2));
console.log('Updated site.json text for COURSES_LEARN_MORE_BTN');
