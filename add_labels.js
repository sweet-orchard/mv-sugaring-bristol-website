import fs from 'fs';
let siteJson = JSON.parse(fs.readFileSync('src/content/site.json', 'utf8'));

const mappings = {
    'FACE_TAB_FULL_LABEL': 'CONTACT_FORM_OPTGROUP_FACE',
    'UPPER_TAB_FULL_LABEL': 'CONTACT_FORM_OPTGROUP_UPPER',
    'DOWN_TAB_FULL_LABEL': 'CONTACT_FORM_OPTGROUP_DOWN',
    'BIKINI_TAB_FULL_LABEL': 'CONTACT_FORM_OPTGROUP_BIKINI'
};

for (const [newKey, oldKey] of Object.entries(mappings)) {
    if (siteJson.en[oldKey]) siteJson.en[newKey] = siteJson.en[oldKey];
    if (siteJson.uk[oldKey]) siteJson.uk[newKey] = siteJson.uk[oldKey];
}

fs.writeFileSync('src/content/site.json', JSON.stringify(siteJson, null, 2));
