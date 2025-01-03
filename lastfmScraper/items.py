# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class LastfmscraperItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass

class SongItem(scrapy.Item):
    song_id = scrapy.Field()
    song_name = scrapy.Field()
    album_name = scrapy.Field()
    song_listeners = scrapy.Field()
    song_url = scrapy.Field()
