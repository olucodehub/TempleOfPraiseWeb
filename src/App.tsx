import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Pastor from './pages/Pastor';
import Departments from './pages/Departments';
import ChurchWork from './pages/ChurchWork';
import MediaGallery from './pages/MediaGallery.tsx';
import Events from './pages/Events';
import NewMember from './pages/NewMember';
import Foundation from './pages/Foundation';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/pastor" element={<Pastor />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/church-work" element={<ChurchWork />} />
              <Route path="/media" element={<MediaGallery />} />
              <Route path="/events" element={<Events />} />
              <Route path="/new-member" element={<NewMember />} />
              <Route path="/foundation" element={<Foundation />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;