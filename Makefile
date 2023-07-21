.PHONY: app


dev: contrib build
	npm run dev

containers: app

container: node_modules contrib build

node_modules:
	npm ci || npm install

build: contrib
	npm run build

app:
	docker build -t api -f app.dockerfile .

contrib:
	make -C src/contrib

clean: 
	docker rmi --force app 

