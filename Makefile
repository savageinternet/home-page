all: copy

copy: build/css/style.css build/content/projects.html build/index.html
	cp -r consulting.html fonts img js team.html build

build/css/style.css: less/style.less
	mkdir -p build/css
	./node_modules/less/bin/lessc less/style.less build/css/style.css

build/content/projects.html: content/projects.json content/projects.mustache
	mkdir -p build/content 
	./node_modules/mustache/bin/mustache content/projects.json content/projects.mustache > build/content/projects.html

build/index.html: index.html.tpl build/content/projects.html
	sed -e '/{PROJECTS}/{r build/content/projects.html' -e 'd}' index.html.tpl > build/index.html

clean:
	rm -r build
