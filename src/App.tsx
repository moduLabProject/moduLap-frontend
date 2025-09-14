import './App.css';
import Counter from './components/Counter'; // 예시 import

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          moduLapProject
        </h1>
        <Counter /> {/* 예시 component */}
      </div>
    </div>
  );
}

export default App;
