import fs from 'fs';
let siteJson = JSON.parse(fs.readFileSync('src/content/site.json', 'utf8'));

siteJson.en['ABOUT_STAT_4_LABEL'] = 'GOOGLE RATING (48)';
siteJson.uk['ABOUT_STAT_4_LABEL'] = 'ОЦІНКА В GOOGLE (48)';

fs.writeFileSync('src/content/site.json', JSON.stringify(siteJson, null, 2));
console.log('Updated site.json');
