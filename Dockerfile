FROM node:16.6.0 as build

# Get required files
COPY . .

# Install app dependencies
RUN npm install

# Build app
RUN npm run build

FROM node:16.6.0

# Create build directory
RUN mkdir -p /app
WORKDIR /app

# Get files for production
COPY --from=build package.json .
COPY --from=build dist dist
COPY --from=build server server
RUN rm -rf server/**/*.ts

# Install production dependencies
RUN npm install --production

# Fire up the app
EXPOSE 80
CMD [ "npm", "start" ]
