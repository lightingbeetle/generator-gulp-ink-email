# Generator Gulp Ink Email

> Yeoman generator for creating responsive emails using [Zurb Ink framwork](http://zurb.com/ink/). Developed and used by [Lighting Beetle](http://www.lbstudio.sk).

## Prereqisities

* [Node.js](http://nodejs.org/)
* [Yeoman](http://yeoman.io/)
```javascript
(sudo) npm install -g yo
```
* [Sass](http://sass-lang.com/)

## Built-in tools

* Gulp (Task Manager)
* Sass (CSS Preprocessor)
* Jade (HTML templating)
* Browser Sync (livereload development)

## Built-in features

* ZURB Ink responsive email templates
* ZURB Ink CSS using Sassy Ink [Unofficial Sass port of Ink, Zurb's responsive email framework](https://github.com/faustgertz/sassy-ink) (Sass)
* ZURB Ink.css (non-Sass)
* Webserver with liverelaod
* Jade templates compilation (Jade)
* Sass compilation (Sass)
* CSS concating and inlining

## Installation guide

1. Install via npm `(sudo) npm install -g generator-gulp-ink-email`  
2. Create folder for your project and run inside: `yo gulp-ink-email`  
3. Complete installation
4. ?
5. Profit

## Usage

Gulpfile contains some useful tasks:

1. `gulp serve` for development with livereload
2. `gulp build` for building from source to `dist` folder
3. `gulp serve:dist` for build preview

## Issues

Media queries must be included in head of html/jade template manually due [issue #18](https://github.com/jonkemp/gulp-inline-css/issues/18), so copy appropriate css to head.
 
## Contributors
 * Adam Močkoř (mockor@lbstudio.sk)

--- 
[![Lighting Beetle](http://www.lbstudio.sk/static/imgs/lb-logo-orange.png "Lighting Beetle")](http://www.lbstudio.sk)

