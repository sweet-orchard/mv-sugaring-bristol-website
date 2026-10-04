import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import siteContent from '../content/site.json';
import { EditMenu } from '../components/EditMenu'; // we will create this

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
    const [lang, setLang] = useState(() => {
        const saved = localStorage.getItem('lang');
        if (saved === 'ua' || saved === 'uk') return 'uk';
        return saved || 'en';
    });
    
    const [isEditMode, setIsEditMode] = useState(false);
    const [adminToken, setAdminToken] = useState(null);
    const [localContent, setLocalContent] = useState(siteContent);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [pendingChanges, setPendingChanges] = useState({ en: {}, uk: {} });
    
    // For inline editing
    const [editingKey, setEditingKey] = useState(null);

    useEffect(() => {
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
    }, [lang]);
    
    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (token) {
            setAdminToken(token);
            setIsEditMode(true);
        }
    }, []);

    const updateContent = (key, val, editLang) => {
        setLocalContent(prev => ({
            ...prev,
            [editLang]: {
                ...prev[editLang],
                [key]: val
            }
        }));
        setPendingChanges(prev => ({
            ...prev,
            [editLang]: {
                ...prev[editLang],
                [key]: val
            }
        }));
        setUnsavedChanges(true);
        setEditingKey(null); // close editor
    };

    return (
        <ContentContext.Provider value={{ 
            lang, setLang, 
            isEditMode, setIsEditMode, 
            adminToken, setAdminToken,
            localContent, setLocalContent,
            unsavedChanges, setUnsavedChanges, pendingChanges, setPendingChanges,
            updateContent,
            editingKey, setEditingKey
        }}>
            {children}
            {isEditMode && <EditMenu />}
        </ContentContext.Provider>
    );
}

export function useContent() {
    const ctx = useContext(ContentContext);
    if (!ctx) throw new Error('useContent must be used inside ContentProvider');
    
    const { lang, localContent, isEditMode } = ctx;
    
    const t = (key) => {
        if (isEditMode && tKeys && tKeys.current) tKeys.current.add(key);
        if (import.meta.env.DEV) {
            if (!(key in localContent.en)) {
                console.warn(`Missing content key: ${key}`);
            }
        }
        
        let text = localContent.en[key] || '';
        
        if (lang === 'uk') {
            text = localContent.uk[key] || localContent.en[key] || '';
        }

        return text;
    };

    return { ...ctx, t };
}

export function T({ id, render }) {
    const ctx = useContext(ContentContext);
    if (ctx && ctx.TKeys && ctx.TKeys.current) {
        ctx.TKeys.current.add(id);
    }
    const ctx = useContext(ContentContext);
    if (!ctx) return null;
    const { isEditMode, setEditingKey, localContent, lang } = ctx;
    
    let text = localContent.en[id] || '';
    let isFallback = false;
    
    if (lang === 'uk') {
        if (localContent.uk[id]) {
            text = localContent.uk[id];
        } else if (localContent.en[id]) {
            text = localContent.en[id];
            isFallback = true;
        }
    }

    if (!isEditMode) { return render ? render(text) : <>{text}</>; }

    return (
        <span 
            className="group relative z-[99] cursor-text hover:ring-2 hover:ring-primary/60 transition-all rounded-sm inline-flex items-center"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setEditingKey(id);
            }}
        >
            <span className={isFallback ? 'opacity-50' : ''}>{render ? render(text) : (text || ' ')}</span>
            {isFallback && <span className="absolute -top-3 -right-3 text-[8px] bg-secondary/80 text-foreground px-1 rounded whitespace-nowrap  transition-opacity pointer-events-none">not translated yet</span>}
        </span>
    );
}
