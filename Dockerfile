FROM nginx

MAINTAINER lvyalin <lvyalin.yl@gmail.com>

COPY dist /usr/share/nginx/html

## docker build -t wallet_client .
## docker run --name nginx -p 80:80 -itd wallet_client