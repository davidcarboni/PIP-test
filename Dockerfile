FROM node

ENV DEBIAN_FRONTEND="noninteractive" TZ="Europe/London"
RUN apt update && \
  apt install -y git nodejs npm

RUN git clone https://github.com/davidcarboni/PIP-test.git
WORKDIR /PIP-test

RUN npm install -g @angular/cli
RUN npm install

#https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported
ENV NODE_OPTIONS=--openssl-legacy-provider

RUN ng build
# RUN ng test

RUN ls

CMD ng serve --host 0.0.0.0
