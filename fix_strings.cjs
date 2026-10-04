const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/components/**/*.jsx');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // We will inject `const getText = (v) => v?.props?.id ? t(v.props.id) : v;` inside components that use `useContent()`
    if (content.includes('useContent()')) {
        content = content.replace(/const { t, lang } = useContent\(\);/, 'const { t, lang } = useContent();\n    const getText = (v) => v?.props?.id ? t(v.props.id) : v;');
    }
    
    // Replace alt={item.name} -> alt={getText(item.name)}
    content = content.replace(/alt=\{([a-zA-Z0-9_]+\.(?:name|title))\}/g, 'alt={getText($1)}');
    // Replace key={item.name} -> key={getText(item.name)}
    content = content.replace(/key=\{([a-zA-Z0-9_]+\.(?:name|title))\}/g, 'key={getText($1)}');
    // Replace aria-label={item.name} -> aria-label={getText(item.name)}
    content = content.replace(/aria-label=\{([a-zA-Z0-9_]+\.(?:name|title))\}/g, 'aria-label={getText($1)}');
    
    // Fix string concatenations or template literals using item.name
    // There might not be many, but we can look for `${item.name}`
    content = content.replace(/\$\{([a-zA-Z0-9_]+\.(?:name|title))\}/g, '${getText($1)}');

    if (content !== original) {
        fs.writeFileSync(file, content);
    }
});
