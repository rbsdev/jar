NODE_MODULES=./node_modules/
HTTP_SERVER=$(NODE_MODULES)http-server/bin/http-server
BROWSERIFY=$(NODE_MODULES)browserify/bin/cmd.js
VIGILIA=$(NODE_MODULES)vigilia/bin/vigilia
UGLIFY=$(NODE_MODULES)uglify-js/bin/uglifyjs
JSHINT=$(NODE_MODULES)jshint/bin/jshint
MOCHA=$(NODE_MODULES)mocha-phantomjs/bin/mocha-phantomjs
IMAGEMIN=$(NODE_MODULES)imagemin/cli.js

DIR_APP=app/
DIR_APP_SCRIPT=$(DIR_APP)script/
DIR_BUILD=build/
DIR_BUILD_SCRIPT=$(DIR_BUILD)script/
DIR_BUILD_IMAGE=$(DIR_BUILD)image/
DIR_APP_IMAGE=$(DIR_APP)image/
DIR_APP_VENDOR=$(DIR_APP)vendor/
DIR_BUILD_VENDOR=$(DIR_BUILD)vendor/
DIR_APP_SOUND=$(DIR_APP)sound/
DIR_BUILD_SOUND=$(DIR_BUILD)sound/

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
	printf 'installing dependencies... '
	npm i -g divshot-cli
	npm install
	node_modules/bower/bin/bower install
	echo "\x1b[32mDONE!\x1b[0m"

run:
	# node server.js
	$(HTTP_SERVER) -p 8000

jshint:
	$(JSHINT) $(DIR_APP_SCRIPT)*.js

script: jshint
	printf 'building scripts... '
	$(BROWSERIFY) $(DIR_APP_SCRIPT)kickoff.js -o $(DIR_BUILD_SCRIPT)kickoff.js
	$(BROWSERIFY) $(DIR_APP_SCRIPT)game.js -o $(DIR_BUILD_SCRIPT)game.js
	$(UGLIFY) $(DIR_BUILD_SCRIPT)kickoff.js -o $(DIR_BUILD_SCRIPT)kickoff.min.js
	$(UGLIFY) $(DIR_BUILD_SCRIPT)game.js -o $(DIR_BUILD_SCRIPT)game.min.js
	echo "     \x1b[32mDONE!\x1b[0m"

image:
	printf 'compressing images... '
	$(IMAGEMIN) $(DIR_APP_IMAGE)* $(DIR_BUILD_IMAGE)
	echo "   \x1b[32mDONE!\x1b[0m"

tree:
	printf 'genrating tree... '
	mkdir -p $(DIR_BUILD)
	mkdir -p $(DIR_BUILD_IMAGE)
	mkdir -p $(DIR_BUILD_VENDOR)
	mkdir -p $(DIR_BUILD_SCRIPT)
	mkdir -p $(DIR_BUILD_SOUND)
	cp $(DIR_APP)*.html $(DIR_BUILD)
	cp $(DIR_APP_IMAGE)*.png $(DIR_BUILD_IMAGE)
	cp $(DIR_APP_VENDOR)* $(DIR_BUILD_VENDOR)
	cp $(DIR_APP_SCRIPT)* $(DIR_BUILD_SCRIPT)
	cp $(DIR_APP_SOUND)* $(DIR_BUILD_SOUND)
	echo "       \x1b[32mDONE!\x1b[0m"

test_js:
	$(MOCHA) test/SpecRunner.html

build: tree script image

watch: tree script
	$(VIGILIA) '$(DIR_APP_SCRIPT)*.js':'make script' '$(DIR_APP)*.html':'make tree'
