# This is a spider that scrapes all songs from every album of chosen artist that is added on last.fm
# It scrapes song name, song id, album name, song listeners and song url
# To run this spider and save data to a file use command: scrapy crawl songspider -o output.json (or .csv)

import scrapy

class SongspiderSpider(scrapy.Spider):
    name = "songspider"
    allowed_domains = ["www.last.fm"]
    # Put there artist name you want to scrape, if there's a space in the name replace it with a '+'
    # input isn't case-sensitive
    artist = "destroy+lonely"
    start_urls = [f"https://www.last.fm/pl/music/{artist}/+albums"]

    def parse(self, response):
        albums = response.css('#artist-albums-section ol li div.resource-list--release-list-item')
        for album in albums:
            relative_url = album.css('.resource-list--release-list-item-name a::attr(href)').get().strip()
            if relative_url is not None:
                album_url = response.urljoin(relative_url)
                yield response.follow(album_url, callback=self.parse_album_page)

            next_page = response.css('.pagination-next a::attr(href)').get()
            if next_page is not None:
                yield response.follow(next_page, self.parse)


    def parse_album_page(self, response):
        songs = response.css('tr.chartlist-row')
        album_name = response.css('h1.header-new-title::text').get().strip()
        for song in songs:
            song_id = song.css('.chartlist-index::text').get().strip()
            song_name = song.css('.chartlist-name a::text').get().strip()
            song_listeners = song.css('.chartlist-count-bar-value::text').get().replace('\xa0', '').strip()
            song_url = response.urljoin(song.css('.chartlist-name a::attr(href)').get().strip())

            yield {
                "song_id": song_id,
                "song_name": song_name,
                "album-name": album_name,
                "song_listeners": song_listeners,
                "song_url": song_url,
            }