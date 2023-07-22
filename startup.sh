sudo apt update
sudo apt -y upgrade
sudo apt-get install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
sudo nvm install 18
sudo nvm use 18
npm install -g gatsby-cli
#!/bin/bash

# # Define the custom command
# custom_command='export NODE_OPTIONS=--openssl-legacy-provider && gatsby develop --host 0.0.0.0'

# # Use jq to append the custom command to the scripts section
# jq --arg cmd "$custom_command" '.scripts.custom = $cmd' package.json > tmp.$$.json && mv tmp.$$.json package.json