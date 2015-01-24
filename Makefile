NODE_MODULES=./node_modules/
HTTP_SERVER=$(NODE_MODULES)http-server/bin/http-server
BROWSERIFY=$(NODE_MODULES)browserify/bin/cmd.js
VIGILIA=$(NODE_MODULES)vigilia/bin/vigilia
UGLIFY=$(NODE_MODULES)uglify-js/bin/uglifyjs
JSHINT=$(NODE_MODULES)jshint/bin/jshint
MOCHA=$(NODE_MODULES)mocha-phantomjs/bin/mocha-phantomjs

DIR_APP=app/
DIR_APP_SCRIPT=$(DIR_APP)script/
DIR_BUILD=build/
DIR_BUILD_SCRIPT=$(DIR_BUILD)

run:
	$(HTTP_SERVER)

jshint:
	$(JSHINT) $(DIR_APP_SCRIPT)*.js
	echo "jshint was execute!"

browserify:
	$(BROWSERIFY) $(DIR_APP_SCRIPT)main.js -o $(DIR_BUILD_SCRIPT)main.js

minify:
	$(UGLIFY) $(DIR_BUILD_SCRIPT)main.js -o $(DIR_BUILD_SCRIPT)main.min.js

tree:
	mkdir -p build/ && mkdir -p build/script
	cp $(DIR_APP)index.html $(DIR_BUILD)index.html

build: jshint tree browserify minify

