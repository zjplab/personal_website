import requests
from bs4 import BeautifulSoup
import os
from datetime import datetime

class BlogDownloader:
    def __init__(self, blog_url, folder):
        self.blog_url = blog_url
        self.folder = folder

    def get_year_links(self, soup):
        year_links = []
        for li in soup.find_all('li', class_='archivedate'):
            year_link = li.find('a', class_='post-count-link')
            if year_link:
                year_links.append(year_link['href'])
        return year_links

    def get_post_links_from_year_page(self, url):
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        post_links = []
        for link in soup.select('h3.post-title.entry-title a'):
            post_links.append(link['href'])
        return post_links

    def download_blog_post(self, url):
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        slug = url.split('/')[-1].split('.')[0]
        raw_date = soup.find('h2', class_='date-header').text
        date = datetime.strptime(raw_date, '%A, %B %d, %Y').strftime('%Y-%m-%d') # convert to 'yyyy-mm-dd' format
        filename = f'{date}-{slug}.html' # appending date before title
        filepath = f'{self.folder}/{filename}'
        if not os.path.exists(filepath):
            with open(filepath, 'w', encoding='utf8') as f:
                f.write(str(soup))

    def download_blog_posts(self):
        if not os.path.exists(self.folder):
            os.makedirs(self.folder, exist_ok=True)

        response = requests.get(self.blog_url)
        soup = BeautifulSoup(response.content, 'html.parser')

        year_links = self.get_year_links(soup)

        for year_url in year_links:
            post_links = self.get_post_links_from_year_page(year_url)
            for post_url in post_links:
                self.download_blog_post(post_url)

        print('Done!')

if __name__ == "__main__":
    downloader = BlogDownloader('https://ai.zjplab.com', 'posts')
    downloader.download_blog_posts()