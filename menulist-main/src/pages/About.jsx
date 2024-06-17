import React from "react";
import { Link } from 'react-router-dom';
import './About.sass';

const About = () => {
  return (
    <div>
       <div style={{ textAlign: 'right', marginTop: '20px' }}>
          <Link to="/" className="explore-menu-button">Explore Menu</Link>
        </div>
      <section className="heroSection" id="heroSection">
        <div className="container">
          <div className="banner">
            <div className="largeBox">
              <h1 className="title">Delicious</h1>
            </div>
            <div className="combined_boxes">
              <div className="imageBox">
                <img src="./hero1.png" alt="hero" />
              </div>
              <div className="textAndLogo">
                <div className="textWithSvg">
                  <h1 className="title">Food</h1>
                  <img src="./threelines.svg" alt="threelines" />
                </div>
                <img className="logo" src="logo.svg" alt="logo" />
              </div>
            </div>
          </div>
          <div className="banner1">
            <img src="hero2.png" alt="hero" />
            <h1 className="dishes_title">Dishes</h1>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="container">
          <div className="banner">
            <div className="top">
              <h1 className="heading">ABOUT US</h1>
              <p>The only thing we're serious about is food.</p>
            </div>
            <p className="mid">
              The cornerstone of our restaurant is the qaulity of its food.It will be delicious,cocsistent,and we make with fresh ingrediants.
              Our Service will always be Prompt,friendly and professional service enchances the dining experience.
              We attract the customers whuch includes the decor,lighting,music,and overall comfort.our restaurant has located at 
              a convenient and accessible location, where we provide ample parking or near public transportation.We maintain a clean and hygiene
              environment is essentail to make good impressions 
            </p>
          </div>
          <div className="banner3">
            <img src="about.png" alt="about" />
          </div>
          
        </div>
      </section>

    <section className='menu' id='menu'>
    <h1 className="heading">POPULAR DISHES</h1>
    <div className="pop">
        <div className="dish">
            <img src="./img/Des.jpg" alt="Desert"/>
            <h2 className='title'>Desert</h2>
        </div>
        <div className="dish">
            <img src="./img/fra.jpg" alt="Shawarma"/>
            <h2 className='title'>Prawn-Biryani</h2>
        </div>
        <div className="dish">
            <img src="./img/loi.jpg" alt="Egg-Sauce"/>
            <h2 className='title'>Egg-Sauce</h2>
        </div>
        <div className="dish">
            <img src="./img/ing.jpg" alt="Noodles"/>
            <h2 className='title'>Chocolate-Cake</h2>
        </div>
    </div>
</section>

      <section className='qualities' id='qualities'>
        <div className="container">
          <div className='card'>
            <img src="super_taste.svg" alt="Quality 1" />
            <p className='title'>Supertaste</p>
            <p className='description'>To supertasters, foods may have much stronger flavors, which often leads to supertasters having very strong likes and dislikes for different foods.</p>
          </div>
          <div className='card'>
            <img src="quality_food.svg" alt="Quality 2" />
            <p className='title'>Quality</p>
            <p className='description'>Food quality is the sum of all properties and attributes of a food item that are acceptable to the customer. These attributes include: Appearance, Texture, Flavor, Nutritional content, and Ethical and sustainable production.</p>
          </div>
          <div className='card'>
            <img src="fast_delivery.svg" alt="Quality 3" />
            <p className='title'>Fast delivery</p>
            <p className='description'>Fast delivery not only increases customer satisfaction, but also creates a positive experience with your company and builds trus</p>
          </div>
        </div>
      </section>
      <section>
        <div>
          <img src='numbe.png' />
        </div>
      </section>
      <section className='qualities1' id='qualities1'>
        <div className="container">
        <h1 className="title">Our Team</h1>
          <div className='card'>
            <img src="mem_1.png" alt="Quality 1" />
            <p className='title'>Head_Chef</p>
            <p className='description'>Kin-chui a head chef is a culinary professional who manages a kitchen and is responsible for the quality of food production and hygiene. He is the highest-ranking person working in the kitchen, even in restaurants that employ an executive chef.</p>
          </div>
          <div className='card'>
            <img src="mem_4.png" alt="Quality 2" />
            <p className='title'>Fast-Food_Chef</p>
            <p className='description'>Bairsto a head chef, also known as an executive chef or master chef, is responsible for managing the kitchen in a fast-paced environment. He is in charge of the food preparation process, menu creation, and ensuring the highest standards of food qualityand presentation.</p>
          </div>
        </div>
      </section>
      <div className='hr'></div>
      
      <div className="hel">
          <div className="tem1">
            <div className="left"></div>
            <div className="right">
              <p>Gandipet, 
                Hyderabad</p>
              <p>Open: 05:00 AM - 12:00 PM</p>
            </div>
          </div>
          <div className="tem2">
            <div className="left">
              <p>Developed By 
                HARI</p>
            </div>
            <div className="tem3">
              <p>All Rights Reserved By @HARI-Solutions.</p>
            </div>
          </div>
        </div>
    </div>
    
  );
};

export default About;
