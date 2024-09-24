FROM node:14

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Clear npm cache and install dependencies
RUN npm cache clean --force && npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3000

CMD ["npm", "start"]