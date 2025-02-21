import './App.css';
import { Route, Routes } from 'react-router';
import LoginForm from './pages/Login';

function App() {
	return (
		<div className="w-screen h-screen p-16">
			<Routes>
				<Route path="/login" element={<LoginForm />} />
			</Routes>
		</div>
	);
}

export default App;
