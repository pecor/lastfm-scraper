import React, { useState } from 'react';
import api from '../api';
import './SongFetcher.css';
import DownloadModal from './DownloadModal';

const SongFetcher = () => {
    const [artist, setArtist] = useState('');
    const [songs, setSongs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [artistData, setArtistData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchSongs = async () => {
        setSongs([]); // Clear previous songs
        setFilteredSongs([]); // Clear previous filtered songs
        setArtistData(null); // Clear previous artist data
        setLoading(true);
        try {
            const [songsResponse, artistResponse] = await Promise.all([
                api.get('/songs', { params: { artist } }),
                api.get('/artists', { params: { artist } })
            ]);

            // Filter out duplicates
            const allSongs = songsResponse.data.songs;
            const filtered = allSongs.filter(song =>
                !song.album_name.includes('[Explicit]') &&
                !song.album_name.includes('[Clean]') &&
                !song.album_name.includes('- Single')
            );

            const sortedSongs = allSongs.sort((a, b) => {
                if (a.album_name === b.album_name) {
                    return a.song_id - b.song_id;
                }
                return a.album_name.localeCompare(b.album_name);
            });

            const sortedFilteredSongs = filtered.sort((a, b) => {
                if (a.album_name === b.album_name) {
                    return a.song_id - b.song_id;
                }
                return a.album_name.localeCompare(b.album_name);
            });

            setSongs(sortedSongs);
            setFilteredSongs(sortedFilteredSongs);
            setArtistData(artistResponse.data.artists[0]);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const downloadFile = (content, fileName, contentType) => {
        const a = document.createElement('a');
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    };

    const handleDownload = (format, listType, fileName) => {
        const list = listType === 'filtered' ? filteredSongs : songs;
        if (format === 'csv') {
            const csvContent = list.map(song =>
                `${song.song_id},${song.song_name},${song.album_name},${song.song_listeners},${song.song_url}`
            ).join('\n');
            const csvHeader = 'ID,Name,Album,Listeners,URL\n';
            downloadFile(csvHeader + csvContent, `${fileName}.csv`, 'text/csv');
        } else {
            const jsonContent = JSON.stringify(list, null, 2);
            downloadFile(jsonContent, `${fileName}.json`, 'application/json');
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
                    onKeyDown={(e) => { if (e.key === 'Enter') fetchSongs(); }}
                />
                <button onClick={fetchSongs} disabled={loading} className="circle-button">+</button>
            </div>
            {loading && <div className="spinner"></div>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            {artistData && (
                <div className="artist-container">
                    <img className="artist-image" src={artistData.artist_image} alt={artistData.artist_name} />
                    <div className="artist-details">
                        <a href={artistData.artist_url} target="_blank" rel="noopener noreferrer">{artistData.artist_name}</a>
                        <span>Listeners: {artistData.artist_listeners}</span>
                        <span>Scrobbles: {artistData.artist_scrobbles}</span>
                    </div>
                </div>
            )}
            {filteredSongs.length > 0 && (
                <div className="total-download-container">
                    <p>Total: <b>{filteredSongs.length}</b></p>
                    <button onClick={() => setIsModalOpen(true)} className="download-button"><i
                        className="fas fa-download"></i></button>
                </div>
            )}
            <ul className="no-bullets">
                {filteredSongs.length > 0 && <hr/>}
                {filteredSongs.map((song, index) => (
                    <React.Fragment key={index}>
                        {index === 0 || song.album_name !== filteredSongs[index - 1].album_name ? (
                            <strong><br/>{song.album_name}</strong>
                        ) : null}
                        <li>
                            {song.song_id}. {song.song_name} ({song.song_listeners} listeners)
                            <i><a href={song.song_url} target="_blank" rel="noopener noreferrer"> More info...</a></i>
                        </li>
                    </React.Fragment>
                ))}
                {filteredSongs.length > 0 && <hr/>}
            </ul>
            <DownloadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onDownload={handleDownload}
            />
        </div>
    );
};

export default SongFetcher;