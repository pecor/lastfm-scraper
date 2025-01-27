import subprocess
import json
import os

def scrape_songs(artist):
    # Get the absolute path to the Scrapy project directory
    scrapy_project_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'lastfmScraper'))

    # Change to the directory where the Scrapy project is located
    os.chdir(scrapy_project_dir)

    # Run the Scrapy spider and save the output to a JSON file
    subprocess.run(["scrapy", "crawl", "songspider", "-a", f"artist={artist}", "-O", "output.json"])

    # Read the JSON file and return the data
    with open("output.json", "r", encoding="utf-8") as file:
        data = json.load(file)

    return data

def scrape_artist(artist):
    # Get the absolute path to the Scrapy project directory
    scrapy_project_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'lastfmScraper'))

    # Change to the directory where the Scrapy project is located
    os.chdir(scrapy_project_dir)

    # Run the Scrapy spider and save the output to a JSON file
    subprocess.run(["scrapy", "crawl", "artistspider", "-a", f"artist={artist}", "-O", "output_artist.json"])

    # Read the JSON file and return the data
    with open("output_artist.json", "r", encoding="utf-8") as file:
        data = json.load(file)

    return data