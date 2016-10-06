# mailmake

> Generate RFC1521 valid mime files for use with Mailgun and other similar services.

[![Build Status](https://api.travis-ci.org/neogeek/mailmake.svg)](https://travis-ci.org/neogeek/mailmake)
[![Dependency Status](https://david-dm.org/neogeek/mailmake.svg?style=flat)](https://david-dm.org/neogeek/mailmake)
[![codecov](https://img.shields.io/codecov/c/github/neogeek/makefile/master.svg)](https://codecov.io/gh/neogeek/makefile)
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
  -s, --subject     Set the subject header.
  -f, --from        Set the from email address header.
  -t, --to          Set the to email address header.
```

## API

### Install

```bash
$ npm install mailmake --save
```

### Usage

```javascript
var mailmake = require('mailmake');

var email_contents = '# Hello World!';

mailmake.generate(email_contents, {
    subject: 'Hello World!',
    from: 'test@example.com',
    to: 'mailing-list@example.com'
}).then(function (output) {
    console.log(output);
});
```



### randomString([num]) 

Returns a randomly generated string based on seed.

    console.log(mailmake.randomString(10));


#### Parameters

- **num** `Integer`  *Optional* The length of randomly generated string. Default 20.




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
        subject: 'Hello World!',
        from: 'test@example.com',
        to: 'mailing-list@example.com'
    }));


#### Parameters

- **input** `String`   String of email contents. Can be either HTML or Markdown.
- **options** `String`  *Optional* Options for generating file.
- **options.subject** `String`  *Optional* Subject of email.
- **options.from** `String`  *Optional* From address of email.
- **options.to** `String`  *Optional* To address of email.




#### Returns


- `String`   Returns contents of generated mime file.




### generate(input[, options]) 

Returns generated mime file contents based on either file or string.

    mailmake.generate('email.html', {
       subject: 'Hello World!',
       from: 'test@example.com',
       to: 'mailing-list@example.com'
    }).then(function (output) {
       console.log(output);
    });


#### Parameters

- **input** `String`   File path or string of email contents. Can be either HTML or Markdown.
- **options** `String`  *Optional* Options for generating file.
- **options.subject** `String`  *Optional* Subject of email.
- **options.from** `String`  *Optional* From address of email.
- **options.to** `String`  *Optional* To address of email.




#### Returns


- `Object`   Promise returns contents of generated mime file.




## Reference

<http://www.w3.org/Protocols/rfc1341/0_TableOfContents.html>

*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
