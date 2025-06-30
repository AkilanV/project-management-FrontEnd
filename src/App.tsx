import { Routes, Route, useLocation } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import { Box } from '@mui/material';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <>
      {!isLoginPage && <Header />}

      <Box sx={{ minHeight: 'calc(90vh - 80px)' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/create-project" element={<ProjectForm />} />
        </Routes>
      </Box>

      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;
