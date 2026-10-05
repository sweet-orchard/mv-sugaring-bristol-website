const fs = require('fs');

let lines = fs.readFileSync('src/components/ServicesSection.jsx', 'utf8').split('\n');

// Find start and end indices
// We know "<!-- ── Collapsible Duration Notes ── -->" starts around 665 but lines might have shifted.
let inclusionsEndIdx = lines.findIndex(l => l.includes('</motion.div>') && lines[l - 2] && lines[l - 2].includes('</div>') && lines[l - 1] === '');
// Let's just find exactly by comment.

let inclusionsStart = lines.findIndex(l => l.includes('SERVICES_INCLUSIONS_LABEL'));
// inclusions block ends at `</motion.div>` 14 lines below that.
// Let's find the `<!-- ── Tab Navigation ── -->` which is right after inclusions.
let tabNavIdx = lines.findIndex(l => l.includes('{/* ── Tab Navigation ── */}'));

let durationNotesStartIdx = lines.findIndex(l => l.includes('{/* ── Collapsible Duration Notes ── */}'));
// Duration notes ends at `</motion.div>` line 709.
// The easiest way is to extract it using the markers.
// duration notes block goes until the end of the AnimatePresence's parent motion.div

let durationNotesEndIdx = -1;
for (let i = durationNotesStartIdx; i < lines.length; i++) {
    if (lines[i].includes('</motion.div>') && lines[i-2] && lines[i-2].includes('</AnimatePresence>')) {
        durationNotesEndIdx = i;
        break;
    }
}

console.log('tabNavIdx', tabNavIdx);
console.log('durationNotesStartIdx', durationNotesStartIdx);
console.log('durationNotesEndIdx', durationNotesEndIdx);

if (tabNavIdx !== -1 && durationNotesStartIdx !== -1 && durationNotesEndIdx !== -1) {
    let durationNotesBlock = lines.slice(durationNotesStartIdx, durationNotesEndIdx + 1);
    
    // Remove the block from its original position
    lines.splice(durationNotesStartIdx, durationNotesEndIdx - durationNotesStartIdx + 1);
    
    // Insert before Tab Navigation
    // Wait, let's insert it before `tabNavIdx` but after the empty line above it?
    // Let's insert exactly at `tabNavIdx - 1`
    
    lines.splice(tabNavIdx - 1, 0, ...durationNotesBlock);
    
    fs.writeFileSync('src/components/ServicesSection.jsx', lines.join('\n'));
    console.log('Moved successfully.');
} else {
    console.log('Failed to find indices.');
}
