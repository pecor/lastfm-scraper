# backend/main.py
import uvicorn
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from lastfmScraper.lastfmScraper.scraper import scrape_songs

class Song(BaseModel):
    song_id: str
    song_name: str
    album_name: str
    song_listeners: str
    song_url: str

class Songs(BaseModel):
    songs: List[Song]

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:5173" # Add the new port here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/songs", response_model=Songs)
def get_songs(artist: str = Query(..., description="Name of the artist")):
    songs_data = scrape_songs(artist)
    return Songs(songs=songs_data)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)