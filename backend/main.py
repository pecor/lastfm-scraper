# backend/main.py
import uvicorn
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from lastfmScraper.lastfmScraper.scraper import *

class Song(BaseModel):
    song_id: str
    song_name: str
    album_name: str
    song_listeners: str
    song_url: str

class Songs(BaseModel):
    songs: List[Song]



class Artist(BaseModel):
    artist_name: str
    artist_image: str
    artist_listeners: str
    artist_scrobbles: str
    artist_url: str

class Artists(BaseModel):
    artists: List[Artist]
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

@app.get("/artists", response_model=Artists)
def get_artists(artist: str = Query(..., description="Name of the artist")):
    artists_data = scrape_artist(artist)
    return Artists(artists=artists_data)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)