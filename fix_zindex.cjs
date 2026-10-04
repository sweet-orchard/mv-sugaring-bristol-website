const fs = require('fs');

// Navbar.jsx
let nav = fs.readFileSync('src/components/Navbar.jsx', 'utf8');
nav = nav.replace(/z-50/g, 'z-[1000]'); // Desktop nav and Mobile menu button
nav = nav.replace(/z-40/g, 'z-[999]');  // Mobile menu background
fs.writeFileSync('src/components/Navbar.jsx', nav);

// StickyBookingButton.jsx
if (fs.existsSync('src/components/StickyBookingButton.jsx')) {
    let sticky = fs.readFileSync('src/components/StickyBookingButton.jsx', 'utf8');
    sticky = sticky.replace(/z-50/g, 'z-[1000]');
    fs.writeFileSync('src/components/StickyBookingButton.jsx', sticky);
}

// BeforeAfterSection.jsx
let beforeAfter = fs.readFileSync('src/components/BeforeAfterSection.jsx', 'utf8');
beforeAfter = beforeAfter.replace(/z-50/g, 'z-[1000]');
fs.writeFileSync('src/components/BeforeAfterSection.jsx', beforeAfter);

// TestimonialsSection.jsx (has z-10, z-20. The modal/dialog might have z-50).
// Wait, the popup is likely a <Dialog> or similar. Let's just fix ui/dialog.jsx if it exists.
if (fs.existsSync('src/components/ui/dialog.jsx')) {
    let dialog = fs.readFileSync('src/components/ui/dialog.jsx', 'utf8');
    dialog = dialog.replace(/z-50/g, 'z-[2000]');
    fs.writeFileSync('src/components/ui/dialog.jsx', dialog);
}
if (fs.existsSync('src/components/ui/sheet.jsx')) {
    let sheet = fs.readFileSync('src/components/ui/sheet.jsx', 'utf8');
    sheet = sheet.replace(/z-50/g, 'z-[2000]');
    fs.writeFileSync('src/components/ui/sheet.jsx', sheet);
}

// Ensure EditMenu has higher z-index
let editMenu = fs.readFileSync('src/components/EditMenu.jsx', 'utf8');
// EditMenu is z-[9999] so it's already above 1000.
// Also update the check to ensure it uses import.meta.env.DEV
let ctx = fs.readFileSync('src/context/ContentContext.jsx', 'utf8');
if (!ctx.includes('import.meta.env.DEV')) {
    ctx = ctx.replace(/process\.env\.NODE_ENV !== 'development'/g, '!import.meta.env.DEV');
}
fs.writeFileSync('src/context/ContentContext.jsx', ctx);
