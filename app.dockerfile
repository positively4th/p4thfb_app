FROM fedora:38
RUN dnf -y upgrade

RUN dnf -y install curl make git nginx


SHELL ["/bin/bash", "--login", "-c"]

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
RUN nvm install lts/gallium
RUN nvm alias default lts/gallium

RUN mkdir /app
WORKDIR /app
ADD  src/ ./src/
ADD  public/ ./public/
COPY Makefile package.* rollup.config.js ./
RUN make container

COPY nginx.conf /etc/nginx/


RUN dnf -y install telnet wget procps
#RUN dnf -y remove git make

ENTRYPOINT  nginx -g 'daemon off;'
#RUN systemctl nginx restart
#ENTRYPOINT cd /app && npm run start
#ENTRYPOINT cd /app && npm run dev
#ENTRYPOINT ["/bin/bash", "--login", "-c", "cd", "/app", "&&",  "npm", "run", "dev"]