import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

export default function AdminPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setAdminToken, setIsEditMode } = useContent();

    useEffect(() => {
        // Add meta noindex programmatically
        const meta = document.createElement('meta');
        meta.name = "robots";
        meta.content = "noindex";
        document.head.appendChild(meta);

        return () => {
            document.head.removeChild(meta);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            if (!res.ok) {
                throw new Error('Invalid password');
            }

            const data = await res.json();
            
            // Success
            localStorage.setItem('admin_token', data.token);
            setAdminToken(data.token);
            setIsEditMode(true);
            
            // Redirect to home
            navigate('/');
            
        } catch (err) {
            setError('Incorrect password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="bg-secondary/30 p-8 rounded-lg shadow-sm border border-border/50 max-w-sm w-full text-center">
                <h1 className="font-display text-2xl mb-2">Admin Access</h1>
                <p className="text-muted-foreground text-sm mb-6">Enter password to enable edit mode.</p>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password" 
                        className="p-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 text-center"
                        autoFocus
                    />
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-primary text-primary-foreground py-3 rounded uppercase tracking-wider font-semibold text-sm hover:bg-primary/90 transition-colors"
                    >
                        {loading ? 'Verifying...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
