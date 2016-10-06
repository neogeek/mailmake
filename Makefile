BIN=node_modules/.bin

test:
	$(BIN)/mocha ./test/specs/**.js

docs:
	$(BIN)/doxdox lib/mailmake.js --layout templates/README.hbs --output README.md

coverage:
	$(BIN)/jscoverage lib lib-cov
	COVERAGE=1 $(BIN)/mocha ./test/specs/**.js -R mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js
	rm -rf lib-cov

.PHONY: test
