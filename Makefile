EXEC=phaser-template

test:
	@gulp

clean:
	@gulp clean

build:
	@gulp build

android-test: build
	cd cordova && $(MAKE) test

android-build: build
	cd cordova && $(MAKE) build

android-init:
	@rm -rf cordova
	cordova create cordova org.cravesoft.$(EXEC) $(EXEC)
	@cp Makefile.sample cordova/Makefile
	@cp config.xml.sample cordova/config.xml
	cd cordova && $(MAKE) init

.PHONY: test clean build
