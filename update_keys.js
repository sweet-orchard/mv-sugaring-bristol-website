import fs from 'fs';

const replacements = [
    { old: 'FACE_SERVICE_8_DURATION', new: 'FACE_SERVICE_3_DURATION', lineMatch: 'FACE_SERVICE_3_NAME' },
    { old: 'FACE_SERVICE_8_DURATION', new: 'FACE_SERVICE_4_DURATION', lineMatch: 'FACE_SERVICE_4_NAME' },
    { old: 'FACE_SERVICE_8_DURATION', new: 'FACE_SERVICE_7_DURATION', lineMatch: 'FACE_SERVICE_7_NAME' },
    { old: 'FACE_PREMIUM_3_DURATION', new: 'FACE_PREMIUM_2_DURATION', lineMatch: 'FACE_PREMIUM_2_NAME' },
    { old: 'DOWN_SERVICE_5_DURATION', new: 'UPPER_SERVICE_3_DURATION', lineMatch: 'UPPER_SERVICE_3_NAME' },
    { old: 'DOWN_SERVICE_4_DURATION', new: 'UPPER_SERVICE_4_DURATION', lineMatch: 'UPPER_SERVICE_4_DESC' }, // Since name will be changed
    { old: 'DOWN_SERVICE_4_DURATION', new: 'DOWN_SERVICE_3_DURATION', lineMatch: 'DOWN_SERVICE_3_NAME' },
    { old: 'DOWN_SERVICE_5_DURATION', new: 'BIKINI_SERVICE_3_DURATION', lineMatch: 'BIKINI_SERVICE_3_DESC' }, // name changed too
    { old: 'UPPER_ADDON_2_DURATION', new: 'UPPER_ADDON_1_DURATION', lineMatch: 'UPPER_ADDON_1_NAME' },
    { old: 'BIKINI_ADDON_GROUP_NAME', new: 'UPPER_ADDON_GROUP_NAME', lineMatch: 'UPPER_ADDON_1_NAME', isGroup: true },
    { old: 'BIKINI_ADDON_GROUP_NAME', new: 'DOWN_ADDON_GROUP_NAME', lineMatch: 'DOWN_ADDON_1_NAME', isGroup: true },
    { old: 'BIKINI_SERVICE_2_DURATION', new: 'BIKINI_SERVICE_1_DURATION', lineMatch: 'BIKINI_SERVICE_1_NAME' },
    { old: 'FACE_COMBO_1_BADGE', new: 'BIKINI_SERVICE_1_BADGE', lineMatch: 'BIKINI_SERVICE_1_NAME' },
    { old: 'CONTACT_FORM_OPTGROUP_FACE', new: 'FACE_TAB_FULL_LABEL', lineMatch: 'SERVICES_TAB_FACE' },
    { old: 'CONTACT_FORM_OPTGROUP_UPPER', new: 'UPPER_TAB_FULL_LABEL', lineMatch: 'SERVICES_TAB_UPPER' },
    { old: 'CONTACT_FORM_OPTGROUP_DOWN', new: 'DOWN_TAB_FULL_LABEL', lineMatch: 'SERVICES_TAB_DOWN' },
    { old: 'CONTACT_FORM_OPTGROUP_BIKINI', new: 'BIKINI_TAB_FULL_LABEL', lineMatch: 'SERVICES_TAB_BIKINI' },
    { old: 'CONTACT_FORM_OPTION_UNDERARMS', new: 'UPPER_SERVICE_1_NAME', lineMatch: 'UPPER_SERVICE_1_DESC' },
    { old: 'CONTACT_FORM_OPTION_STOMACH', new: 'UPPER_SERVICE_4_NAME', lineMatch: 'UPPER_SERVICE_4_DESC' },
    { old: 'CONTACT_FORM_OPTION_GSTRING', new: 'BIKINI_SERVICE_3_NAME', lineMatch: 'BIKINI_SERVICE_3_DESC' },
    { old: 'CONTACT_FORM_OPTION_BASIC_BIKINI', new: 'BIKINI_SERVICE_4_NAME', lineMatch: 'BIKINI_SERVICE_4_DESC' }
];

let servicesData = fs.readFileSync('src/components/ServicesData.jsx', 'utf8');
let lines = servicesData.split('\n');

for (let r of replacements) {
    if (r.isGroup) {
        // Group names are above the items, so we find the line with lineMatch and go up
        const idx = lines.findIndex(l => l.includes(r.lineMatch));
        for (let i = idx; i >= Math.max(0, idx - 10); i--) {
            if (lines[i].includes(r.old)) {
                lines[i] = lines[i].replace(r.old, r.new);
                break;
            }
        }
    } else {
        const idx = lines.findIndex(l => l.includes(r.lineMatch));
        if (idx !== -1 && lines[idx].includes(r.old)) {
            lines[idx] = lines[idx].replace(r.old, r.new);
        } else {
            console.warn('Could not apply replacement for', r.new, 'at match', r.lineMatch);
        }
    }
}

fs.writeFileSync('src/components/ServicesData.jsx', lines.join('\n'));

let siteJson = JSON.parse(fs.readFileSync('src/content/site.json', 'utf8'));

for (let r of replacements) {
    if (siteJson.en[r.old]) {
        siteJson.en[r.new] = siteJson.en[r.old];
    }
    if (siteJson.uk[r.old]) {
        siteJson.uk[r.new] = siteJson.uk[r.old];
    }
}

fs.writeFileSync('src/content/site.json', JSON.stringify(siteJson, null, 2));
console.log('Update complete.');
