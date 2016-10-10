# mailmake

> Generate RFC1521 valid mime files for use with Mailgun and other similar services.

[![Build Status](https://travis-ci.org/neogeek/mailmake.svg?branch=master)](https://travis-ci.org/neogeek/mailmake)
[![codecov](https://img.shields.io/codecov/c/github/neogeek/mailmake/master.svg)](https://codecov.io/gh/neogeek/mailmake)
[![Dependency Status](https://david-dm.org/neogeek/mailmake.svg)](https://david-dm.org/neogeek/mailmake)
[![Known Vulnerabilities](https://snyk.io/test/npm/mailmake/badge.svg)](https://snyk.io/test/npm/mailmake)
[![bitHound Overall Score](https://www.bithound.io/github/neogeek/mailmake/badges/score.svg)](https://www.bithound.io/github/neogeek/mailmake)
[![NPM Version](http://img.shields.io/npm/v/mailmake.svg?style=flat)](https://www.npmjs.org/package/mailmake)

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

## API

### Install

```bash
$ npm install mailmake --save
```

### Usage

```javascript
const mailmake = require('mailmake');

const email_contents = '# Hello World!';

mailmake.generate(email_contents, {
    'from': 'test@example.com',
    'subject': 'Hello World!',
    'to': 'mailing-list@example.com'
}).then(output => {
    console.log(output);
});
```



### randomString() 

Returns a randomly generated string based on seed.

    console.log(mailmake.randomString());




#### Returns


- `String`   Randomly generated string.




### boundaryString() 

Returns a boundary string.

    console.log(mailmake.boundaryString());




#### Returns


- `String`   Boundary string.




### generateFromString(input[, options])  *private method*

Returns generated mime file contents.

    console.log(mailmake.generateFromString('# Hello World!', {
        'from': 'test@example.com',
        'subject': 'Hello World!',
        'to': 'mailing-list@example.com'
    }));


#### Parameters

- **input** `String`   String of email contents. Can be either HTML or Markdown.
- **options** `String`  *Optional* Options for generating file.
- **options.from** `String`  *Optional* From address of email.
- **options.subject** `String`  *Optional* Subject of email.
- **options.to** `String`  *Optional* To address of email.




#### Returns


- `String`   Returns contents of generated mime file.




### generate(input[, options]) 

Returns generated mime file contents based on either file or string.

    mailmake.generate('email.html', {
       'from': 'test@example.com',
       'subject': 'Hello World!',
       'to': 'mailing-list@example.com'
    }).then(output => {
       console.log(output);
    });


#### Parameters

- **input** `String`   File path or string of email contents. Can be either HTML or Markdown.
- **options** `String`  *Optional* Options for generating file.
- **options.from** `String`  *Optional* From address of email.
- **options.subject** `String`  *Optional* Subject of email.
- **options.to** `String`  *Optional* To address of email.




#### Returns


- `Object`   Promise returns contents of generated mime file.




## Reference

<http://www.w3.org/Protocols/rfc1341/0_TableOfContents.html>

*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
