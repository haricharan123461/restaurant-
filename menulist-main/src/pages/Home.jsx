import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { data } from '../../data';
import Menulist from './Menulist';
import { CirclesWithBar } from 'react-loader-spinner';
import axios from 'axios';

function Home() {
    const [meals] = useState(data);
    const [loading, setLoading] = useState(true);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [orders, setOrders] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [tableNumber, setTableNumber] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:3001/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while fetching orders. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    setTimeout(() => {
        if (loading) {
            setLoading(false);
        }
    }, 500);

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:3001/login", { username, password });
            if (response.status === 200) {
                setShowLoginForm(false);
                setLoggedIn(true);
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while logging in. Please try again later.');
        }
    };

    const handleOrderSubmit = async (selectedItems, totalPrice, tableNumber, customerName) => {
        if (!customerName || !tableNumber) {
            alert('Please enter customer name and table number.');
            return;
        }

        const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        const newOrder = { selectedItems, totalPrice, tableNumber, customerName, timestamp, served: false };

        try {
            const response = await axios.post('http://localhost:3001/orders', newOrder);

            if (response.status === 200) {
                alert('🤩 Order placed successfully!');
                setOrders([...orders, newOrder]);
                setCustomerName('');
                setTableNumber(null);
            } else {
                alert('😞 Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while placing the order. Please try again later.');
        }
    };

    const toggleServedStatus = async (_id) => {
        try {
            const orderToUpdate = orders.find(order => order._id === _id);
            if (!orderToUpdate) {
                console.error('Order not found');
                return;
            }
            const newServedStatus = !orderToUpdate.served;

            if (window.confirm(`Do you want to ${newServedStatus ? 'serve' : 'not serve'} this order?`)) {
                if (username === 'weighter' && password === 'weighter123' && !newServedStatus) {
                    alert('You are not allowed to mark orders as not served.');
                    return;
                }

                const response = await axios.put(`http://localhost:3001/orders/${_id}`, { served: newServedStatus });

                if (response.status === 200) {
                    const updatedOrders = orders.map(order => {
                        if (order._id === _id) {
                            order.served = newServedStatus;
                        }
                        return order;
                    });
                    setOrders(updatedOrders);
                } else {
                    alert('😞 Failed to update order status. Please try again.');
                }
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRefresh = () => {
        setLoading(true);
        fetchOrders();
    };

    return (
        <div>
            <div className="top-0 left-0 w-full z-10">
                <img src="/iop.jpg" alt="Logo" className="mx-auto mb-4" style={{ width: '300px', height: '100px' }} />
                <Header title='ɪʀᴀH-Menu' />
                {!loggedIn && (
                    <button
                        className="fixed top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setShowLoginForm(true)}
                    >
                        Management
                    </button>
                )}
            </div>
            <div className="mt-20 ">
                {loading && (
                    <div className='flex items-center justify-center'>
                        <CirclesWithBar
                            height='50'
                            width='50'
                            color='#4fa94d'
                            wrapperStyle={{}}
                            wrapperClass=''
                            visible={true}
                            outerCircleColor=''
                            innerCircleColor=''
                            barColor=''
                            ariaLabel='circles-with-bar-loading'
                        />
                    </div>
                )}

                {!loading && !showLoginForm && !loggedIn && <Menulist meals={meals} onOrderSubmit={handleOrderSubmit} customerName={customerName} setCustomerName={setCustomerName} tableNumber={tableNumber} setTableNumber={setTableNumber} />}
                {showLoginForm && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded" style={{ backgroundImage: "url('/login.jpg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                        <img src="/favicon.ico" alt="Logo" className="mx-auto mb-4" style={{ width: '50px', height: '50px' }} />
                        <h2 className="text-xl mb-4">Login</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            className="border border-gray-400 rounded px-2 py-1 mb-2 block w-full"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="border border-gray-400 rounded px-2 py-1 mb-2 block w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                            onClick={() => setShowLoginForm(false)}
                        >
                            Back
                        </button>
                    </div>
                )}

                {loggedIn && !showLoginForm && (
                    <div style={{ backgroundImage: "url('/oo.jpg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', minHeight: '100vh' }}>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
                            onClick={handleRefresh}
                        >
                            🔄Refresh
                        </button>
                        <table className="mt-30 mx-auto border-collapse border border-gray-400">
                            <thead>
                                <tr>
                                    <th className="border border-gray-400 px-4 py-2">S.NO</th>
                                    <th className="border border-gray-400 px-4 py-2">CUSTOMER NAME</th>
                                    <th className="border border-gray-400 px-4 py-2">ID_QUANTITY_FLAVOUR</th>
                                    <th className="border border-gray-400 px-4 py-2">PRICE</th>
                                    <th className="border border-gray-400 px-4 py-2">TABLE NUMBER</th>
                                    <th className="border border-gray-400 px-4 py-2">TIMESTAMP</th>
                                    <th className="border border-gray-400 px-4 py-2">SERVICE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...orders].reverse().map((order, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                                        <td className="border border-gray-400 px-4 py-2">{order.customerName}</td>
                                        <td className="border border-gray-400 px-4 py-2">
                                            {order.selectedItems.map((item, i) => (
                                                <div key={i}>
                                                    ID: {item.id}, Quantity: {item.quantity}, Flavour: {item.flavor}
                                                </div>
                                            ))}
                                        </td>
                                        <td className="border border-gray-400 px-4 py-2">{order.totalPrice}</td>
                                        <td className="border border-gray-400 px-4 py-2">{order.tableNumber}</td>
                                        <td className="border border-gray-400 px-4 py-2">{order.timestamp}</td>
                                        <td className="border border-gray-400 px-4 py-2">
                                            <button
                                                className={`py-2 px-4 rounded ${order.served ? 'bg-green-500 hover:bg-green-700 text-white' : 'bg-red-500 hover:bg-red-700 text-white'}`}
                                                onClick={() => toggleServedStatus(order._id)}
                                            >
                                                {order.served ? '✅ Served' : '❌ Not Served'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
