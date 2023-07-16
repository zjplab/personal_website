import requests
from bs4 import BeautifulSoup
import os
from datetime import datetime

blog_url = 'https://ai.zjplab.com'

def get_year_links(soup):
    year_links = []
    for li in soup.find_all('li', class_='archivedate'):
        year_link = li.find('a', class_='post-count-link')
        if year_link:
            year_links.append(year_link['href'])
    return year_links

def get_post_links_from_year_page(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    post_links = []
    for link in soup.select('h3.post-title.entry-title a'):
        post_links.append(link['href'])
    return post_links

def download_blog_post(url, folder):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # title = soup.find('h3', class_='post-title').text
    slug = url.split('/')[-1].split('.')[0]
    raw_date = soup.find('h2', class_='date-header').text
    date = datetime.strptime(raw_date, '%A, %B %d, %Y').strftime('%Y-%m-%d') # convert to 'yyyy-mm-dd' format
    filename = f'{date}-{slug}.html' # appending date before title
    with open(f'{folder}/{filename}', 'w', encoding='utf8') as f:
        f.write(str(soup))

def download_blog_posts(url, folder):
    if not os.path.exists(folder):
        os.makedirs(folder)

    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    year_links = get_year_links(soup)

    for year_url in year_links:
        post_links = get_post_links_from_year_page(year_url)
        for post_url in post_links:
            download_blog_post(post_url, folder)

    print('Done!')

if __name__ == "__main__":
    download_blog_posts(blog_url, 'posts')
