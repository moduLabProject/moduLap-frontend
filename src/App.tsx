import './App.css';
import { Routes, Route, useNavigate } from 'react-router';
import Counter from './components/Counter';
import { Button } from './components/ui/Button';
import { Signup } from './auth/sign-up';

function MainPage() {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          moduLapProject
        </h1>
        <Counter />
        <Button
          variant="primary"
          label="회원가입"
          onClick={handleSignupClick}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
