const fs = require('fs');

let content = fs.readFileSync('src/components/EditMenu.jsx', 'utf8');

// Update toolbar container
content = content.replace(
    'className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto w-[90%] max-w-2xl bg-background border border-primary/20 shadow-xl rounded-full px-6 py-3 flex items-center justify-between gap-4"',
    'className="fixed bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto w-[95%] sm:w-[90%] max-w-2xl bg-background/95 backdrop-blur-md border border-primary/20 shadow-2xl rounded-full px-3 py-2 sm:px-6 sm:py-3 flex items-center justify-between gap-2 sm:gap-4"'
);

// Update Editing button
content = content.replace(
    'className="px-4 py-1.5 bg-secondary hover:bg-secondary/80 border border-border/50 rounded-full text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2"',
    'className="px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary hover:bg-secondary/80 border border-border/50 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"'
);

// Update Save button
content = content.replace(
    'className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold flex items-center gap-2 transition-all ${unsavedChanges ? \\'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md animate-pulse\\' : \\'bg-secondary text-muted-foreground opacity-50 cursor-not-allowed\\'}`}',
    'className={`px-3 py-1.5 sm:px-5 sm:py-2 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 sm:gap-2 transition-all whitespace-nowrap ${unsavedChanges ? \\'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md animate-pulse\\' : \\'bg-secondary text-muted-foreground opacity-50 cursor-not-allowed\\'}`}'
);

// Update gap between left items
content = content.replace(
    '<div className="flex items-center gap-3">',
    '<div className="flex items-center gap-1.5 sm:gap-3">'
);
// Replace both instances of this div
content = content.replace(
    '<div className="flex items-center gap-3">',
    '<div className="flex items-center gap-1.5 sm:gap-3">'
);

fs.writeFileSync('src/components/EditMenu.jsx', content);
