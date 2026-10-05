const fs = require('fs');

let lines = fs.readFileSync('src/components/ServicesSection.jsx', 'utf8').split('\n');

let tabNavIdx = lines.findIndex(l => l.includes('{/* ── Tab Navigation ── */}'));
let durationNotesStartIdx = lines.findIndex(l => l.includes('{/* ── Collapsible Duration Notes ── */}'));

let durationNotesEndIdx = -1;
for (let i = durationNotesStartIdx; i < lines.length; i++) {
    if (lines[i].includes('</motion.div>') && lines[i-1] && lines[i-1].includes('</AnimatePresence>')) {
        durationNotesEndIdx = i;
        break;
    }
}

console.log('tabNavIdx', tabNavIdx);
console.log('durationNotesStartIdx', durationNotesStartIdx);
console.log('durationNotesEndIdx', durationNotesEndIdx);

if (tabNavIdx !== -1 && durationNotesStartIdx !== -1 && durationNotesEndIdx !== -1) {
    let durationNotesBlock = lines.slice(durationNotesStartIdx, durationNotesEndIdx + 1);
    
    // Add a margin bottom to the duration notes block or a spacing line if needed, it currently has "mt-8".
    // We want it to look good below inclusions. The inclusions wrapper has "mb-14". We can change duration block to just "mb-14" as well.
    // Let's just move it first.
    
    lines.splice(durationNotesStartIdx, durationNotesEndIdx - durationNotesStartIdx + 1);
    
    // Insert before Tab Navigation
    lines.splice(tabNavIdx - 1, 0, ...durationNotesBlock);
    
    fs.writeFileSync('src/components/ServicesSection.jsx', lines.join('\n'));
    console.log('Moved successfully.');
} else {
    console.log('Failed to find indices.');
}
