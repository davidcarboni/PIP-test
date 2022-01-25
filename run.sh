#!/usr/bin/env bash

tag=demokitchen
docker build --tag $tag . && docker run -it --rm -p 4200:4200 $tag
