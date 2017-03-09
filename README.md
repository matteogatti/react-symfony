# TODOLIST

## Overview
Creare una semplice web app per gestire dei ToDo con queste caratteristiche:
 - Il frontend deve essere creato con React
 - Il backend deve essere in php (framework a piacere) e deve permettere di creare e cancellare i to do
 - Il tutto deve girare all'interno di un container di docker
 - La To Do List deve essere salvata su file system (modalità a piacere) ma all'esterno del container di docker

## Init docker
1. vm `docker-machine create uala-todolist --driver virtualbox`
1. build `docker-compose build`
2. provisioning `docker-compose up -d`
3. set hosts `0.0.0.0 todolist.uala.it` in `/etc/hosts`

## Init Symfony
1. vendor `php composer.phar install`
2. database `php bin/console doctrine:database:create`
3. schema `php bin/console doctrine:schema:update --force`
4. asset `php bin/console assets:install web`

## Project
`http://todolist.uala.it:9090/`