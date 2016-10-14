BIN=node_modules/.bin

test:
	$(BIN)/mocha test/specs/

lint:
	$(BIN)/eslint bin/mailmake
	$(BIN)/eslint lib/
	$(BIN)/eslint test/

coverage:
	$(BIN)/istanbul cover $(BIN)/_mocha test/specs && $(BIN)/codecov

docs:
	$(BIN)/doxdox lib/mailmake.js --layout templates/README.hbs --output README.md

.PHONY: test coverage
