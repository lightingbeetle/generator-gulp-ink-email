'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.version = this.pkg.version;
    this.currentYear = (new Date()).getFullYear();
  },

  prompting: {
    templateName: function () {
      var done = this.async();

      if (!this.options['skip-welcome-message']) {
        this.log(chalk.yellow(require('yosay')('Welcome to html email generator. Hodd luck!')));
      }

      var prompts = [{
        name: 'name',
        message: 'What is name of this email template?',
        default: this.appname
      }];

      this.prompt(prompts, function (props) {
        this.name = props.name;

        done();
      }.bind(this));
    },

    templateType: function () {
      var done = this.async();

      var prompts = [{
        type: 'list',
        name: 'template',
        message: 'Please, choose your template (http://zurb.com/ink/templates.php)',
        choices: [{
          name: 'Boilerplate',
          value: 'boilerplate'
        }, {
          name: 'Basic',
          value: 'basic'
        }, {
          name: 'Hero',
          value: 'hero'
        }, {
          name: 'Sidebar',
          value: 'sidebar'
        }, {
          name: 'Sidebar Hero',
          value: 'sidebar-hero'
        }],
        default: 0
      }];

      this.prompt(prompts, function (props) {
        this.emailTemplate = props.template;

        done();
      }.bind(this));
    },
    
    jade: function () {
      var done = this.async();

      var prompts = [{
        type: 'confirm',
        name: 'jade',
        message: 'Would you like to use Jade for html templating?',
        default: true
      }];

      this.prompt(prompts, function (props) {
        this.jade = props.jade;

        done();
      }.bind(this));
    },
    
    sass: function () {
      var done = this.async();

      var prompts = [{
        type: 'confirm',
        name: 'sass',
        message: 'Would you like to use SASS for css precompilation?',
        default: true
      }];

      this.prompt(prompts, function (props) {
        this.sass = props.sass;

        done();
      }.bind(this));
    }
  },

  configuring: {
    config: function () {
      this.config.save();
    }
  },

  writing: {
    readme: function() {
      this.template('_readme.md', 'readme.md');
    },
    
    app: function() {
      this.mkdir('app');
    },
    
    package: function() {
      this.template('_package.json', 'package.json');
    },
    
    gulpfile: function() {
      this.template('_gulpfile.js', 'gulpfile.js');
    },
    
    mailTemplates: function() {
      if (this.jade) {
        this.directory('email_templates/jade/layout', 'app/template/layout');
        this.copy('email_templates/jade/' + this.emailTemplate + '.jade', 'app/template/index.jade');
      } else {
        this.copy('email_templates/' + this.emailTemplate + '.html', 'app/index.html');
      }
    },
    
    styles: function() {
      if (this.sass) {
        this.directory('scss', 'app/styles/scss');
      } else {
        this.copy('css/ink.css', 'app/styles/css/ink.css');
        this.copy('css/main.css', 'app/styles/css/main.css');
      }
    },
    
    extras: function() {
      this.copy('jshintrc', '.jshintrc');
      this.copy('gitignore', '.gitignore');
      this.copy('gitattributes', '.gitattributes');
      this.copy('editorconfig', '.editorconfig');
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      bower: false
    });
  }
});