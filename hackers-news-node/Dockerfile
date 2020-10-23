FROM node:alpine
WORKDIR /app
ENV PORT=4000
COPY . .
RUN yarn
EXPOSE $PORT
ENTRYPOINT ["npm", "start"]