
import React, { useRef, useState } from 'react';
import './Imagegen.css';
import image from '../assets/Untitled.jpg';

const Imagegen = () => {
    const [image_url, setImage_url] = useState('/');
    const inputRef = useRef(null);
    
    const imagegenerator = async () => {
        if (!inputRef.current.value.trim()) {
            alert("Please enter a prompt!");
            return;
        }

        try {
            const response = await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer <Add Your Api Key Here>`,
                },
                body: JSON.stringify({
                    prompt: inputRef.current.value,
                    n: 1,
                    size: "512x512",
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate image");
            }

            const data = await response.json();
            setImage_url(data.data[0].url);
        } catch (error) {
            console.error(error.message);
            alert("Error generating image. Please try again.");
        }
    };

    return (
        <div className="Ai-image">
            <div className="header">
                Ai Image <span>Generator</span>
            </div>
            <div className="loading">
                <div className="image">
                    <img src={image_url === '/' ? image : image_url} alt="Generated" />
                </div>
            </div>
            <div className="search-box">
                <input
                    type="text"
                    ref={inputRef}
                    className="input-box"
                    placeholder="Generate image"
                />
                <div className="gen-btn" onClick={imagegenerator}>
                    Generate
                </div>
            </div>
        </div>
    );
};

export default Imagegen;
