import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';  // Import addItem reducer from CartSlice.jsx

function ProductList({ onHomeClick }) {
  // State to show cart or product list
  const [showCart, setShowCart] = useState(false);
  // State to track added plants to cart
  const [addedToCart, setAddedToCart] = useState({});
  // Dispatch for redux actions
  const dispatch = useDispatch();

 const plantsArray = [
  {
    category: "Air Purifying Plants",
    plants: [
      {
        name: "Snake Plant",
        image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
        description: "Produces oxygen at night, improving air quality.",
        cost: "$15"
      },
      {
        name: "Spider Plant",
        image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
        description: "Filters formaldehyde and xylene from the air.",
        cost: "$12"
      }
    ]
  },
  {
    category: "Succulent Plants",
    plants: [
      {
        name: "Aloe Vera",
        image: "https://cdn.pixabay.com/photo/2017/07/05/01/59/aloe-vera-2477047_1280.jpg",
        description: "Known for medicinal properties and air purification.",
        cost: "$20"
      },
      {
        name: "Jade Plant",
        image: "https://cdn.pixabay.com/photo/2014/01/29/11/05/jade-plant-254988_1280.jpg",
        description: "Easy to care for with fleshy leaves.",
        cost: "$18"
      }
    ]
  },
  {
    category: "Flowering Plants",
    plants: [
      {
        name: "Peace Lily",
        image: "https://cdn.pixabay.com/photo/2017/07/27/22/21/peace-lily-2542829_1280.jpg",
        description: "Removes mold spores and purifies the air.",
        cost: "$22"
      },
      {
        name: "African Violet",
        image: "https://cdn.pixabay.com/photo/2017/01/05/14/51/african-violet-1954842_1280.jpg",
        description: "Beautiful flowering plant suitable for indoors.",
        cost: "$15"
      }
    ]
  }
];


  // Handles clicking "Add to Cart"
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));  // Dispatch in redux slice
    setAddedToCart(prev => ({
      ...prev,
      [plant.name]: true  // Mark this plant as added
    }));
  };

  // Handlers for UI navigation: Home, Cart, Plants
  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const styleObj = {
    backgroundColor: '#4CAF50',
    color: '#fff!important',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px',
  };

  const styleObjUl = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '1100px',
  };

  const styleA = {
    color: 'white',
    fontSize: '30px',
    textDecoration: 'none',
  };

  return (
    <div>
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury">
            <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
            <a href="/" onClick={handleHomeClick}>
              <div>
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div style={styleObjUl}>
          <div><a href="#" onClick={handlePlantsClick} style={styleA}>Plants</a></div>
          <div>
            <a href="#" onClick={handleCartClick} style={styleA}>
              <h1 className='cart'>
                {/* SVG Cart Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="68" width="68">
                  <rect width="156" height="156" fill="none"></rect>
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </h1>
            </a>
          </div>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {/* Map through each category */}
          {plantsArray.map((categoryObj, catIndex) => (
            <React.Fragment key={catIndex}>
              <h2>{categoryObj.category}</h2>
              {/* Map through plants in this category */}
              {categoryObj.plants.map((plant, i) => (
                <div key={i} className="plant-card">
                  <h3>{plant.name}</h3>
                  <img src={plant.image} alt={plant.name} />
                  <p>{plant.description}</p>
                  <p>Cost: {plant.cost}</p>
                  <button
                    disabled={addedToCart[plant.name]}
                    onClick={() => handleAddToCart(plant)}
                  >
                    {addedToCart[plant.name] ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
