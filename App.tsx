import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/pages/Dashboard';
import { Users } from './components/pages/Users';
import { Handover } from './components/pages/Handover';
import { Auctions } from './components/pages/Auctions';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/handover" element={<Handover />} />
          <Route path="/auctions" element={<Auctions />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
      <Toaster />
    </BrowserRouter>
  );
}
