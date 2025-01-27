import React from 'react';
import './DownloadModal.css';

const DownloadModal = ({ isOpen, onClose, onDownload }) => {
    const [format, setFormat] = React.useState('csv');
    const [listType, setListType] = React.useState('filtered');

    const handleDownload = () => {
        const fileName = listType === 'filtered' ? 'filtered_songs' : 'songs';
        onDownload(format, listType, fileName);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Download options</h2>
                <table className="modal-content">
                    <tbody>
                        <tr>
                            <td>
                                <span
                                    className={`option ${format === 'csv' ? 'selected' : ''}`}
                                    onClick={() => setFormat('csv')}
                                >
                                    CSV
                                </span>
                            </td>
                            <td>
                                <span
                                    className={`option ${format === 'json' ? 'selected' : ''}`}
                                    onClick={() => setFormat('json')}
                                >
                                    JSON
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span
                                    className={`option ${listType === 'filtered' ? 'selected' : ''}`}
                                    onClick={() => setListType('filtered')}
                                >
                                    Filtered songs
                                </span>
                            </td>
                            <td>
                                <span
                                    className={`option ${listType === 'regular' ? 'selected' : ''}`}
                                    onClick={() => setListType('regular')}
                                >
                                    All songs
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="modal-actions">
                    <button onClick={handleDownload}>Download</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DownloadModal;