import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import { LangProvider } from './context/LangContext';

function App() {
    return (
        <QueryClientProvider client={queryClientInstance}>
            <LangProvider>
                <Router>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Router>
                <Toaster />
            </LangProvider>
        </QueryClientProvider>
    )
}

export default App