# Step 1: Use a Node.js base image
FROM node:latest

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json (if it exists) to install dependencies
COPY package*.json ./

# Step 4: Install the dependencies inside the container
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Expose the port your app will run on (e.g., 3000)
EXPOSE 3000

# Step 7: Run your Express.js app
CMD ["node", "server.js"]
