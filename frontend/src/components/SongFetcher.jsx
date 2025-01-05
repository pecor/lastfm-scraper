import React, { useState } from 'react';
import api from '../api';
import './SongFetcher.css';

const SongFetcher = () => {
    const [artist, setArtist] = useState('');
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchSongs = async () => {
        setSongs([]); // Clear previous songs
        setLoading(true);
        try {
            const response = await api.get('/songs', { params: { artist } });
            const sortedSongs = response.data.songs.sort((a, b) => {
                if (a.album_name === b.album_name) {
                    return a.song_id - b.song_id;
                }
                return a.album_name.localeCompare(b.album_name);
            });
            setSongs(sortedSongs);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error fetching songs:', error);
            setError('Failed to fetch songs. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="input-container">
                <input
                    type="text"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder="Enter artist name"
                />
                <button onClick={fetchSongs} disabled={loading} className="circle-button">+</button>
            </div>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {songs.length > 0 && <p>Total: <b>{songs.length}</b></p>}
            <ul className="no-bullets">
                {songs.length > 0 && <hr/>}
                {songs.map((song, index) => (
                    <React.Fragment key={index}>
                        {index === 0 || song.album_name !== songs[index - 1].album_name ? (
                            <strong><br/>{song.album_name}</strong>
                        ) : null}
                        <li>
                            {song.song_id}. {song.song_name} ({song.song_listeners} listeners)
                            <i><a href={song.song_url} target="_blank" rel="noopener noreferrer"> More info...</a></i>
                        </li>
                    </React.Fragment>
                ))}
                {songs.length > 0 && <hr/>}
            </ul>
        </div>
    );
};

export default SongFetcher;