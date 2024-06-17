import React, { useState } from 'react';

const Menulist = ({ meals, onOrderSubmit }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [tableNumber, setTableNumber] = useState(null);
    const [customerName, setCustomerName] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [selectedFlavor, setSelectedFlavor] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleItemSelect = (id, price, quantity, flavor) => {
        const getFlavorPriceMultiplier = (flavor) => {
            switch (flavor) {
                case 'spicy': return 1.02;
                case 'salty': return 1.03;
                case 'sweet': return 1.04;
                case 'sour': return 1.05;
                case 'better': return 1.06;
                case 'pungent': return 1.07;
                default: return 1;
            }
        };

        const flavorPriceMultiplier = getFlavorPriceMultiplier(flavor);
        const itemPrice = price * quantity * flavorPriceMultiplier;

        const existingItemIndex = selectedItems.findIndex(item => item.id === id && item.flavor === flavor);

        if (existingItemIndex !== -1) {
            const updatedItems = [...selectedItems];
            updatedItems[existingItemIndex].quantity += quantity;
            setSelectedItems(updatedItems);
        } else {
            setSelectedItems([...selectedItems, { id, price, quantity, flavor }]);
        }

        setTotalPrice(totalPrice + itemPrice);
    };

    const handleItemRemove = (id, price, flavor) => {
        const getFlavorPriceMultiplier = (flavor) => {
            switch (flavor) {
                case 'spicy': return 1.02;
                case 'salty': return 1.03;
                case 'sweet': return 1.04;
                case 'sour': return 1.05;
                case 'better': return 1.06;
                case 'pungent': return 1.07;
                default: return 1;
            }
        };

        const flavorPriceMultiplier = getFlavorPriceMultiplier(flavor);
        const existingItemIndex = selectedItems.findIndex(item => item.id === id && item.flavor === flavor);

        if (existingItemIndex !== -1) {
            const updatedItems = [...selectedItems];
            const quantityToRemove = updatedItems[existingItemIndex].quantity;
            updatedItems.splice(existingItemIndex, 1);
            setSelectedItems(updatedItems);

            setTotalPrice(totalPrice - (price * quantityToRemove * flavorPriceMultiplier));
        }
    };

    const handleOrderSubmit = () => {
        onOrderSubmit(selectedItems, totalPrice, tableNumber, customerName);
        setSelectedItems([]);
        setTotalPrice(0);
        setTableNumber(null);
        setCustomerName('');
        setSelectedQuantity(1);
        setSelectedFlavor('');
    };

    const handleTableSelect = (tableNum) => {
        setTableNumber(tableNum);
    };

    const chunkArray = (array, size) => {
        const chunkedArr = [];
        let index = 0;
        while (index < array.length) {
            chunkedArr.push(array.slice(index, size + index));
            index += size;
        }
        return chunkedArr;
    };
    

    const tableNumbersChunked = chunkArray([...Array(12).keys()], 3);
    const filteredMeals = meals.filter(meal => meal.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div>
            <input
                type="text"
                placeholder="🔍Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <div className='meal-container'>
                <div className='menu-list-container ml-auto mt-50 mr-24'>
                    {filteredMeals.map((meal) => (
                        <div key={meal.id} className="menu-item">
                            
                            {meal.availability === 'Available' ? (
                            <img src={meal.img} alt='img' className='img' />
                        ) : (
                            <div className="out-of-stock-container">
                            <img src={meal.img} alt='Out of Stock' className='img' />
                            <img src="oos.jpg" alt='Out of Stock' className='oos-img' />
                        </div>
                        )}

                            <div className="meal-details">
                                <h5 className="item-name">{meal.title}</h5>
                                <small>ID: {meal.id}</small>
                                <small>₹{meal.price}</small>
                                <p className='para-menu'>{meal.para}</p>
                                <div className="select-options">
                                    <label>
                                        Quantity:
                                        <select value={selectedQuantity} onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}>
                                            {[...Array(7).keys()].map((num) => (
                                                <option key={num} value={num + 1}>{num + 1}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label>
                                        Flavor:
                                        <select value={selectedFlavor} onChange={(e) => setSelectedFlavor(e.target.value)}>
                                            <option value="">Select Flavor</option>
                                            <option value="spicy">Spicy:₹2%</option>
                                            <option value="salty">Salty:₹3%</option>
                                            <option value="sweet">Sweet:₹4%</option>
                                            <option value="sour">Sour:₹5%</option>
                                            <option value="better">Better:₹6%</option>
                                            <option value="pungent">Pungent:₹7%</option>
                                        </select>
                                    </label>
                                </div>
                                {meal.availability === 'Available' ? (
                                    <button onClick={() => handleItemSelect(meal.id, meal.price, selectedQuantity, selectedFlavor)} className="small-button">Select</button>
                                ) : (
                                    <button disabled className="small-button1">Out of Stock</button>
                                )}
                                {selectedItems.find(item => item.id === meal.id && item.flavor === selectedFlavor) &&
                                    <button onClick={() => handleItemRemove(meal.id, meal.price, selectedFlavor)} className="small-button">Remove</button>
                                }
                            </div>
                        </div>
                    ))}
                </div>

                <div className='fixed top-40 right-0 my-div z-10 p-4'>
                    <div className="customer-logo" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <img src="/log.png" alt="logo" style={{ width: '80px', height: 'auto' }} />
                    </div>
                    <div className="customer-name-input">
                        <label>
                            Customer Name:
                            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                        </label>
                    </div>
                    <h2>Table Number: {tableNumber ? tableNumber : 'click on table below'}</h2>
                    {tableNumbersChunked.map((row, rowIndex) => (
                        <div key={rowIndex} className="table-row">
                            {row.map((num) => (
                                <button key={num} onClick={() => handleTableSelect(num + 1)} className="small-button">Table {num + 1}</button>
                            ))}
                        </div>
                    ))}
                    <div>
                        <h4>Selected Items:</h4>
                        {selectedItems.map((item) => (
                            <p key={item.id}>ID: {item.id}, Quantity: {item.quantity}{item.flavor ? `, Flavor: ${item.flavor}` : ''}</p>
                        ))}
                    </div>
                    <div>
                        <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
                        <button onClick={handleOrderSubmit} className="small-button">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Menulist;
