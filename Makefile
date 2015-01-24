NODE_MODULES=./node_modules/
HTTP_SERVER=$(NODE_MODULES)http-server/bin/http-server
BROWSERIFY=$(NODE_MODULES)browserify/bin/cmd.js
VIGILIA=$(NODE_MODULES)vigilia/bin/vigilia
UGLIFY=$(NODE_MODULES)uglify-js/bin/uglifyjs
JSHINT=$(NODE_MODULES)jshint/bin/jshint
MOCHA=$(NODE_MODULES)mocha-phantomjs/bin/mocha-phantomjs

DIR_APP=app/
DIR_APP_SCRIPT=$(DIR_APP)script/

run:
	$(HTTP_SERVER)

jshint:
	$(JSHINT) $(DIR_APP_SCRIPT)*.js
	echo "jshint was execute!"

browserify:
	$(BROWSERIFY) $(DIR_APP_SCRIPT)main.js -o $(DIR_DIST_SCRIPT)main.js
