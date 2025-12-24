import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Leadership from './pages/Leadership';
import Programs from './pages/Programs';
import CommunityWork from './pages/CommunityWork';
import MediaGallery from './pages/MediaGallery';
import Events from './pages/Events';
import NewMember from './pages/NewMember';
import Foundation from './pages/Foundation';
import Login from './pages/Login';
import Admin from './pages/Admin';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/leadership" element={<Leadership />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/community-work" element={<CommunityWork />} />
                <Route
                  path="/media"
                  element={
                    <ProtectedRoute>
                      <MediaGallery />
                    </ProtectedRoute>
                  }
                />
                <Route path="/events" element={<Events />} />
                <Route path="/new-member" element={<NewMember />} />
                <Route path="/foundation" element={<Foundation />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/admin"
                  element={
                    <AdminProtectedRoute>
                      <Admin />
                    </AdminProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
