import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import ServiceList from './components/ServiceList';
import BookingPage from './components/BookingPage';
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<ServiceList />} />
                    <Route path="/booking/:serviceName" element={<BookingWrapper />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

const BookingWrapper: React.FC = () => {
  const { serviceName } = useParams<{ serviceName: string | undefined }>();
  const navigate = useNavigate();

  if (!serviceName) {
      // Hantera fallet där serviceName inte är definierad
      return <div>Ingen tjänst vald. Vänligen gå tillbaka till tjänstelistan.</div>;
  }

  return (
      <BookingPage serviceName={serviceName} onBack={() => navigate('/')} />
  );
};

export default App;