FROM ifintech/nginx

MAINTAINER lvyalin <lvyalin.yl@gmail.com>

COPY dist /data1/htdocs/www

## docker build -t wallet_client .
## docker run --name nginx -p 80:80 -itd wallet_client