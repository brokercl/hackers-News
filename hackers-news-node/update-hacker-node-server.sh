docker-compose down
prisma generate
prisma deploy
# borra todas las imagenes
docker rmi $(docker images -q)
#docker rmi hacker-server:latest
# docker build -t hacker-server .
# docker run -p 4000:4000 -d --name=hs hacker-server
docker-compose up -d