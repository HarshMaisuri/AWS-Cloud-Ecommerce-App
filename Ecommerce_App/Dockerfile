# Use the official Node.js 18 image as the build image
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use the official Node.js 18 image for the production image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build /app /app

# Expose port 3000
EXPOSE 3000

# Ensure environment variables are available
# ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_UPLOAD_URL=https://87mvh8ltvg.execute-api.us-east-1.amazonaws.com/Prod

# Start the Next.js application
CMD ["npm", "start"]