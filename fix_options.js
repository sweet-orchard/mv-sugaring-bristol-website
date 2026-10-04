import fs from 'fs';

let content = fs.readFileSync('src/components/ContactSection.jsx', 'utf8');

// Replace <option><T id="KEY" /></option> with <option value={t("KEY")}><T id="KEY" /></option>
content = content.replace(/<option><T id="([^"]+)" \/><\/option>/g, '<option value={t("$1")}><T id="$1" /></option>');

fs.writeFileSync('src/components/ContactSection.jsx', content);
console.log('Fixed options in ContactSection.jsx');
