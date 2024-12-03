import React, { useState } from 'react';
import './RandomQuote.css';
import twitter from './Assests/twitter.png';
import reload from './Assests/reload.png';


const RandomQuote = () => {
    const categories = [
        "happiness", "attitude", "education",
        "equality", "jealousy", "love",
        "success", "inspirational"
    ];

    const getRandomCategory = () => {
        return categories[Math.floor(Math.random() * categories.length)];
    };

    const [quote, setQuote] = useState({
        quote: "Difficulties increase the nearer we get to the goal",
        author: "Johann Wolfgang Von Goethe"
    });

    const loadQuote = async () => {
        const randomCategory = getRandomCategory();
        try {
            const response = await fetch(
                `https://api.api-ninjas.com/v1/quotes?category=${randomCategory}`,
                {
                    headers: { 'X-Api-Key': process.env.REACT_APP_API_KEY },
                }
            );
            const result = await response.json();
            if (result && result.length > 0) {
                setQuote(result[0]); // Set the first quote from the response
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    };

    
    const twitter_button = () => {
        window.open(`https://twitter.com/intent/tweet?text=${quote.quote}`);
    };

    return (
        <div className="container">
            <div className="quote">
                {quote.quote}
            </div>
            <div className="line-cover">
                <div className="line"></div>
            </div>
            <div className="bottom">
                <div className="author">
                    - {quote.author}
                </div>
                <div className="icons">
                    <img src={reload} alt="" onClick={loadQuote} />
                    <img src={twitter} alt="" onClick={twitter_button} />
                </div>
            </div>

        </div>
    );
};

export default RandomQuote;

