import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Success from './pages/Success';
import CoursePage from './pages/CoursePage';
import AdminPage from './pages/AdminPage';
import { ContentProvider } from './context/ContentContext';

function App() {
    return (
        <QueryClientProvider client={queryClientInstance}>
            <ContentProvider>
                <Router>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/course" element={<CoursePage />} />
                        <Route path="/success" element={<Success />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Router>
                <Toaster />
            </ContentProvider>
        </QueryClientProvider>
    )
}

export default App