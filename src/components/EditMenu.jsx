import React, { useEffect, useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Save, X, MoreHorizontal, LogOut, CheckCircle, List } from 'lucide-react';
import { toast } from 'sonner';
import { SHARED_KEYS } from '../content/sharedKeys';

export function EditMenu() {
    const { 
        lang, setLang, 
        isEditMode, setIsEditMode, 
        adminToken, setAdminToken,
        localContent,
        unsavedChanges, setUnsavedChanges, pendingChanges, setPendingChanges,
        updateContent,
        editingKey, setEditingKey
    } = useContent();

    const [isSaving, setIsSaving] = useState(false);
    const [editText, setEditText] = useState('');
    const [showMoreTexts, setShowMoreTexts] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (unsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [unsavedChanges]);

    // Handle Inline Editor Init
    useEffect(() => {
        if (editingKey) {
            setEditText(localContent[lang][editingKey] || localContent.en[editingKey] || '');
        }
    }, [editingKey, lang, localContent]);

    const handleSaveInline = () => {
        if (editingKey) {
            updateContent(editingKey, editText, lang);
        }
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: adminToken, changes: pendingChanges })
            });

            
            if (res.status === 401) {
                toast.error("Session expired. Please log in again.");
                localStorage.removeItem('admin_token');
                setAdminToken(null);
                setIsEditMode(false);
                window.location.href = '/admin';
                return;
            }

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || 'Save failed');
            }

                        setUnsavedChanges(false);
            setPendingChanges({ en: {}, uk: {} });
            toast.success("Saved! Your changes will be live in about 1–2 minutes.");
        } catch (error) {
            toast.error(error.message || "Couldn't save, please try again in a minute");
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = () => {
        if (unsavedChanges) {
            if (!window.confirm("You have unsaved changes. Are you sure you want to log out?")) return;
        }
        localStorage.removeItem('admin_token');
        setAdminToken(null);
        setIsEditMode(false);
    };

    const handleToggleLang = () => {
        setLang(lang === 'en' ? 'uk' : 'en');
        setEditingKey(null);
    };

    // Derived list of "More Texts" (all keys not explicitly rendered as <T>)
    // For simplicity, we just list ALL keys in the drawer, but prioritize attributes.
    const allKeys = Object.keys(localContent.en);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {/* Inline Editor Overlay */}
            {editingKey && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm pointer-events-auto flex items-center justify-center p-4">
                    <div className="bg-background border border-border/50 shadow-2xl rounded-lg p-6 max-w-lg w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                Editing <span className="bg-primary/20 text-primary px-2 py-0.5 rounded">{editingKey}</span>
                            </h3>
                            <button onClick={() => setEditingKey(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5"/></button>
                        </div>
                        
                        {/* Language Fallback vs Shared Value logic */}
                        {(() => {
                            if (lang !== 'uk') return null;
                            const hasUk = editingKey in localContent.uk;
                            if (hasUk) return null;
                            
                            const isShared = SHARED_KEYS.includes(editingKey);
                            
                            if (isShared) {
                                return (
                                    <div className="mb-4 text-xs bg-yellow-500/10 text-yellow-600 p-3 rounded border border-yellow-500/20">
                                        Edit this in EN, it's the same in both languages.
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="mb-4 text-xs bg-secondary p-3 rounded border border-border">
                                        This field currently uses the English fallback. Type a Ukrainian translation below to override it.
                                    </div>
                                );
                            }
                        })()}

                        <textarea 
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            disabled={lang === 'uk' && !(editingKey in localContent.uk) && SHARED_KEYS.includes(editingKey)}
                            className="w-full h-32 p-3 bg-secondary/30 border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none font-body text-sm disabled:opacity-50 disabled:cursor-not-allowed"


                            placeholder="Enter text..."
                            autoFocus
                        />
                        <div className="flex justify-end gap-3 mt-4">
                            <button onClick={() => setEditingKey(null)} className="px-4 py-2 text-sm font-medium hover:bg-secondary rounded-sm transition-colors">Cancel</button>
                            <button onClick={handleSaveInline} className="px-6 py-2 bg-primary text-primary-foreground text-sm font-medium tracking-wide rounded-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
                                <CheckCircle className="w-4 h-4"/> Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* More Texts Drawer */}
            {showMoreTexts && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm pointer-events-auto flex justify-end p-4">
                    <div className="bg-background border border-border/50 shadow-2xl rounded-lg w-full max-w-sm flex flex-col h-[calc(100vh-100px)]">
                        <div className="flex justify-between items-center p-4 border-b border-border/50">
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">More Texts (Attributes)</h3>
                            <button onClick={() => setShowMoreTexts(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5"/></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-2 pointer-events-auto">
                            {allKeys.map(k => (
                                <button 
                                    key={k} 
                                    onClick={() => { setEditingKey(k); setShowMoreTexts(false); }}
                                    className="w-full text-left p-3 rounded-sm hover:bg-secondary/50 border border-transparent hover:border-border/50 transition-all text-xs font-mono truncate"
                                >
                                    {k}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Fixed Bottom Toolbar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto w-[90%] max-w-2xl bg-background border border-primary/20 shadow-xl rounded-full px-6 py-3 flex items-center justify-between gap-4">
                
                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleToggleLang}
                        className="px-4 py-1.5 bg-secondary hover:bg-secondary/80 border border-border/50 rounded-full text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2"
                    >
                        Editing: <span className="text-primary">{lang === 'en' ? '🇬🇧 EN' : '🇺🇦 UA'}</span>
                    </button>

                    <button 
                        onClick={() => setShowMoreTexts(true)}
                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-all"
                        title="Edit attributes / more texts"
                    >
                        <List className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleSaveChanges}
                        disabled={!unsavedChanges || isSaving}
                        className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold flex items-center gap-2 transition-all ${unsavedChanges ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md animate-pulse' : 'bg-secondary text-muted-foreground opacity-50 cursor-not-allowed'}`}
                    >
                        <Save className="w-4 h-4" />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>

                    <button 
                        onClick={handleLogout}
                        className="p-1.5 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                        title="Log out"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
