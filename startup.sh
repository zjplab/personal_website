sudo apt update
sudo apt -y upgrade
sudo apt-get install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
sudo nvm install 18
sudo nvm use 18
npm install -g gatsby-cli