FROM mhart/alpine-node:11 AS builder
WORKDIR /app
COPY . .
RUN yarn
RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
ENV PORT=3000
EXPOSE $PORT
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]