test:
	./node_modules/.bin/mocha ./test/specs/**.js

coverage:
	./node_modules/.bin/jscoverage lib lib-cov
	COVERAGE=1 ./node_modules/.bin/mocha ./test/specs/**.js -R mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js
	rm -rf lib-cov

.PHONY: test
