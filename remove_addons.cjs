const fs = require('fs');

let code = fs.readFileSync('src/components/ServicesData.jsx', 'utf8');

// The easiest way is to use a regex to match the addon groups and remove them.
// Addon groups look like this:
//                 {
//                     groupName: <T id="...ADDON_GROUP_NAME" />,
//                     isAddOn: true,
//                     items: [ ... ]
//                 }

// Because the items array can have varying length, let's just parse it line by line.

let lines = code.split('\n');
let newLines = [];
let skip = false;
let braceCount = 0;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('isAddOn: true') && lines[i-1] && lines[i-1].includes('groupName')) {
        // We found an addon group!
        // We need to backtrack to remove the opening `{` which is at i-2
        newLines.pop(); // remove `groupName` line
        newLines.pop(); // remove `{` line
        if (newLines[newLines.length - 1] === ',') {
            newLines.pop(); // remove trailing comma if present
        } else if (newLines[newLines.length - 1] && newLines[newLines.length - 1].trim() === '},') {
            // we leave it because it closed the previous group
        }
        
        skip = true;
        braceCount = 1; // we already read `{` virtually
        continue;
    }
    
    if (skip) {
        if (lines[i].includes('{')) braceCount++;
        if (lines[i].includes('}')) braceCount--;
        
        if (braceCount === 0) {
            skip = false;
            // The line might be `                }` or `                },`
            // we just skip this line as well
        }
        continue;
    }
    
    newLines.push(lines[i]);
}

fs.writeFileSync('src/components/ServicesData.jsx', newLines.join('\n'));
console.log('Add-ons removed successfully.');
