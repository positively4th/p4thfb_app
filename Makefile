.PHONY: \
	setup setup-node_modules setup-contrib \
	docker docker-app \
	build dev-run

default: setup docker

all: setup docker

build: setup
	npm run build

dev-run: setup
	npm run dev


container: setup build

#setup
setup: setup-node_modules setup-contrib

setup-node_modules:
	npm ci || npm install

setup-contrib:
	make -C src/contrib


#docker
docker: docker-app

docker-app:
	docker build -t api -f app.dockerfile .


clean: 
	rm -rf node_modules
	make -C src/contrib clean
	docker rmi --force app 

