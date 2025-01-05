import React from 'react';
import SongFetcher from './components/SongFetcher.jsx';
import Footer from './components/Footer.jsx';

function App() {
    return (
        <div className="App">
            <h1><span className="red-text">Last.fm</span> Song Scraper</h1>
            <SongFetcher />
            <Footer />
        </div>
    );
}

export default App;