docker build -t hacker-news-react .
docker run --add-host=covitest.cl:0.0.0.0 -itd hacker-news-react