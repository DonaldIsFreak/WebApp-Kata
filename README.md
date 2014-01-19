# WebApp-Kata [![Build Status](https://travis-ci.org/DonaldIsFreak/WebApp-Kata.png?branch=master)](https://travis-ci.org/DonaldIsFreak/WebApp-Kata)

WebApp-Kata same as Code Kata, only one thing different is built on the Web platform.

## Prepare

Install MongoDB and turn on the service.

## Install

Install neccesary libraries.

```shell
$ npm install
$ npm install -g bower
$ bower install
```

## How to Run

```shell
$ npm start
```
## How to Test

```shell
$ npm install -g mocha
$ npm install -g istanbul

$ npm test
```

## JSHint

```
$ grunt
```

## Demo

visit [WebApp-Kata at OpenShift](http://nodejstut-donaldisfreak.rhcloud.com/)

## Directory structure
```
├── app
│   ├── controllers
│   ├── models
│   └── views
│       ├── includes
│       └── layouts
├── config
├── public
│   ├── css
│   ├── fonts
│   ├── images
│   └── js
│       └── libs
│           ├── ember
│           ├── ember-data
│           ├── handlebars
│           └── jquery
└── test
```
## License

The MIT license(MIT)
