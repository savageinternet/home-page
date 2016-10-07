all: css/style.css content/projects.html index.html

css/style.css: less/style.less
	./node_modules/less/bin/lessc less/style.less css/style.css

content/projects.html: content/projects.json content/projects.mustache
	./node_modules/mustache/bin/mustache content/projects.json content/projects.mustache > content/projects.html

index.html: index.html.tpl content/projects.html
	sed -e '/{PROJECTS}/{r content/projects.html' -e 'd}' index.html.tpl > index.html

clean:
	rm css/style.css content/projects.html index.html
