import React, { useState } from 'react';
import Header from '../components/Header';
import Menulist from './Menulist';
import { data } from '../../data';
import axios from 'axios';

const Breakfast = () => {
    const [meals] = useState(data);

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
                
            } else {
                alert('😞 Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            
        }
    };

    return (
        <div>
            <Header title='Breakfast Menu💖'/>
            {meals && (
                <Menulist meals={meals.filter((meal)=>meal.type==='breakfast')} onOrderSubmit={handleOrderSubmit}/>
            )}
        </div>
    );
};

export default Breakfast;
