TESTS = test/*.js

test:
	@NODE_ENV=test mocha \
		--require should \
		--reporter spec \
		--slow 20 \
		$(TESTS)

.PHONY: test


