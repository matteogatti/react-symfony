FROM php:7.0-fpm
 
RUN useradd -ms /bin/bash vagrant
 
USER vagrant
 
WORKDIR /app

COPY php-fpm.conf /etc/php-fpm.conf
