// src/App.js
import React from 'react';
import SongFetcher from './components/SongFetcher.jsx';

function App() {
    return (
        <div className="App">
            <h1>Last.fm Song Scraper</h1>
            <SongFetcher />
        </div>
    );
}

export default App;