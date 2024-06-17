import React from 'react'
import{Routes, Route}from 'react-router-dom'
import Breakfast from './pages/Breakfast';
import Dinner from './pages/Dinner';
import About from './pages/About';
import Home from './pages/Home';
import Lunch from './pages/Lunch';
import Snacks from './pages/Snacks';
import Menulist from './pages/Menulist';

const App = () => {
	return (
		<div className="max-w-7xl mx-auto">
			<Routes>
				<Route path='/about' element={<About />}></Route>
				<Route path='/' element={<Home />}></Route>
				<Route path='/breakfast' element={<Breakfast />}></Route>
				<Route path='/lunch' element={<Lunch />}></Route>
				<Route path='/dinner' element={<Dinner />}></Route>
				<Route path='/snacks' element={<Snacks />}></Route>
				<Route path='/Menulist' element={<Menulist />}></Route>
			</Routes>
		</div>
	);
}

export default App
