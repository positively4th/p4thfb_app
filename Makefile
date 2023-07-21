.PHONY: app

build: node_modules contrib
	npm run build

dev: contrib node_modules build
	npm run dev

containers: app

container: node_modules contrib build

node_modules:
	npm ci || npm install


app:
	docker build -t api -f app.dockerfile .

contrib:
	make -C src/contrib

clean: 
	docker rmi --force app 

