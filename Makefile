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
DIR_BUILD_SCRIPT=$(DIR_BUILD)script/
DIR_BUILD_IMAGE=$(DIR_BUILD)image/
DIR_APP_IMAGE=$(DIR_APP)image/
DIR_APP_VENDOR=$(DIR_APP)vendor/
DIR_BUILD_VENDOR=$(DIR_BUILD)vendor/

.SILENT:

deploy:
	divshot push $(DEPLOY_ENVIRONMENT)

deploy_dev:
	$(MAKE) deploy DEPLOY_ENVIRONMENT='development'

deploy_stg:
	$(MAKE) deploy DEPLOY_ENVIRONMENT='staging'

deploy_prd:
	$(MAKE) deploy DEPLOY_ENVIRONMENT='production'

install:
	npm i -g divshot-cli
	npm install
	./node_modules/bower/bin/bower install

run:
	$(HTTP_SERVER)

jshint:
	$(JSHINT) $(DIR_APP_SCRIPT)*.js
	echo "jshint was executed!"

browserify:
	echo $(DIR_BUILD_SCRIPT)
	$(BROWSERIFY) $(DIR_APP_SCRIPT)kickoff.js -o $(DIR_BUILD_SCRIPT)kickoff.js
	$(BROWSERIFY) $(DIR_APP_SCRIPT)main.js -o $(DIR_BUILD_SCRIPT)main.js
	echo "browserify was executed!"

minify:
	$(UGLIFY) $(DIR_BUILD_SCRIPT)kickoff.js -o $(DIR_BUILD_SCRIPT)kickoff.min.js
	$(UGLIFY) $(DIR_BUILD_SCRIPT)main.js -o $(DIR_BUILD_SCRIPT)main.min.js
	echo "minified!"

tree:
	mkdir -p $(DIR_BUILD_IMAGE)
	mkdir -p $(DIR_BUILD_VENDOR)
	cp $(DIR_APP)index.html $(DIR_BUILD)index.html
	cp $(DIR_APP_IMAGE)*.png $(DIR_BUILD_IMAGE)
	cp $(DIR_APP_VENDOR)* $(DIR_BUILD_VENDOR)

test_js:
	$(MOCHA) test/SpecRunner.html

build: jshint tree browserify minify

watch: build
	$(VIGILIA) '$(DIR_APP_SCRIPT)*.js':'make build'
