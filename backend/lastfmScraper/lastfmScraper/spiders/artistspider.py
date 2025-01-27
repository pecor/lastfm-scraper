import scrapy
from ..items import ArtistItem


class ArtistspiderSpider(scrapy.Spider):
    name = "artistspider"
    allowed_domains = ["www.last.fm"]

    def __init__(self, artist=None, *args, **kwargs):
        super(ArtistspiderSpider, self).__init__(*args, **kwargs)
        self.artist = artist.replace(" ", "+")
        self.start_urls = [f"https://www.last.fm/pl/music/{self.artist}"]

    def parse(self, response):
        artist_name = response.css('h1.header-new-title::text').get()
        image_page_url = response.css('a.image-list-item::attr(href)').get()

        # Check if elements exist before accessing them
        listeners_elements = response.css('.intabbr.js-abbreviated-counter::text')
        artist_listeners = listeners_elements[0].get()
        artist_scrobbles = listeners_elements[1].get()
        artist_url = response.url

        if image_page_url:
            yield response.follow(image_page_url, self.parse_image_page, meta={
                'artist_name': artist_name,
                'artist_listeners': artist_listeners,
                'artist_scrobbles': artist_scrobbles,
                'artist_url': artist_url
            })

    def parse_image_page(self, response):
        artist_name = response.meta['artist_name']
        artist_image = response.css('img.js-gallery-image::attr(src)').get()
        artist_listeners = response.meta['artist_listeners']
        artist_scrobbles = response.meta['artist_scrobbles']
        artist_url = response.meta['artist_url']

        artist_item = ArtistItem()
        artist_item["artist_name"] = artist_name
        artist_item["artist_image"] = artist_image
        artist_item["artist_listeners"] = artist_listeners
        artist_item["artist_scrobbles"] = artist_scrobbles
        artist_item["artist_url"] = artist_url

        yield artist_item