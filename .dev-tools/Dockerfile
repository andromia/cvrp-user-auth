FROM node:14-alpine3.10

# Set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Set node in path
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Copy dependencies & config files
COPY package.json .

# Install app dependencies
RUN yarn global add typescript
RUN yarn install

# Copy project files
COPY . .
RUN rm -rf dist/

# Set and expose port
ENV PORT 8080
EXPOSE 8080
