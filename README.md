# mailmake

> Generate RFC1521 valid mime files for use with Mailgun and other similar services.

[![Build Status](https://travis-ci.org/neogeek/mailmake.svg?branch=master)](https://travis-ci.org/neogeek/mailmake)
[![codecov](https://img.shields.io/codecov/c/github/neogeek/mailmake/master.svg)](https://codecov.io/gh/neogeek/mailmake)
[![Dependency Status](https://david-dm.org/neogeek/mailmake.svg)](https://david-dm.org/neogeek/mailmake)
[![Known Vulnerabilities](https://snyk.io/test/npm/mailmake/badge.svg)](https://snyk.io/test/npm/mailmake)
[![bitHound Overall Score](https://www.bithound.io/github/neogeek/mailmake/badges/score.svg)](https://www.bithound.io/github/neogeek/mailmake)
[![NPM Version](http://img.shields.io/npm/v/mailmake.svg?style=flat)](https://www.npmjs.org/package/mailmake)
[![Greenkeeper badge](https://badges.greenkeeper.io/neogeek/mailmake.svg)](https://greenkeeper.io/)
[![Latest Documentation](https://doxdox.org/images/badge-flat.svg)](https://doxdox.org/neogeek/mailmake)

## Installation

```bash
$ npm install mailmake -g
```

## Usage

```
 Usage: mailmake <path> [options]

 Options:

  -h, --help        Display this help message.
  -v, --version     Display the current installed version.
  -f, --from        Set the from email address header.
  -s, --subject     Set the subject header.
  -t, --to          Set the to email address header.
```

### CLI

```
$ mailmake email.html --from "test@example.com" --subject "Hello World!" --to "mailing-list@example.com" > email.mime
```

## Documentation

View full documentation [here](https://doxdox.org/neogeek/mailmake).
