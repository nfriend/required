'use strict';
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const camelCase = require('camelcase');
const upperCamelCase = require('uppercamelcase');

module.exports = yeoman.Base.extend({
  prompting: function () {

    this.log(yosay(
      'Generating a component for Required!'
    ));

    var prompts = [{
      type: 'input',
      name: 'componentName',
      message: 'What would like to name this component?',
      validate: input => {
        if (!/\S/.test(input)) {
          return 'Name cannot be blank';
        } else if (/\s/.test(input)) {
          return 'Name must not include whitespace';
        } else if (/[A-Z]+/.test(input)) {
          return 'Name must not contain capital letters.  Use dashes for word breaks instead';
        } else if (!/^[a-zA-Z0-9_-]+$/.test(input)) {
          return 'Name must be JavaScript-friendly (no weird characters)';
        } else if (/^[0-9]/.test(input)) {
          return 'Name cannot start with a number';
        } else {
          return true;
        }
      },
      default: 'my-cool-thing'
    }, {
      type: 'confirm',
      name: 'shouldCustomize',
      message: 'Would you like to customize this component?',
      default: false
    }, {
      when: response => response.shouldCustomize,
      name: 'directive',
      type: 'confirm',
      message: 'Include a directive?',
      default: true
    }, {
      when: response => response.shouldCustomize,
      name: 'controller',
      type: 'confirm',
      message: 'Include a controller?',
      default: true
    }, {
      when: response => response.shouldCustomize,
      name: 'template',
      type: 'confirm',
      message: 'Include an HTML template?',
      default: true
    }, {
      when: response => response.shouldCustomize,
      name: 'service',
      type: 'confirm',
      message: 'Include an service?',
      default: true
    }, {
      when: response => response.shouldCustomize,
      name: 'stylesheet',
      type: 'confirm',
      message: 'Include a stylesheet?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {

    if (!this.props.shouldCustomize) {
      this.props.directive = this.props.controller = this.props.template = this.props.service = this.props.stylesheet = true;
    }

    this.props.uppercaseName = upperCamelCase(this.props.componentName);
    this.props.lowercaseName = camelCase(this.props.componentName);

    if (this.props.directive) {
      this.fs.copyTpl(
        this.templatePath('directive.ts.template'),
        this.destinationPath(this.props.componentName + '.directive.ts'),
        this.props
      );
    }

    if (this.props.controller) {
      this.fs.copyTpl(
        this.templatePath('controller.ts.template'),
        this.destinationPath(this.props.componentName + '.controller.ts'),
        this.props
      );
    }

    if (this.props.service) {
      this.fs.copyTpl(
        this.templatePath('service.ts.template'),
        this.destinationPath(this.props.componentName + '.service.ts'),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath('service.spec.ts.template'),
        this.destinationPath(this.props.componentName + '.service.spec.ts'),
        this.props
      );
    }

    if (this.props.template) {
      this.fs.copyTpl(
        this.templatePath('template.html.template'),
        this.destinationPath(this.props.componentName + '.html'),
        this.props
      );
    }

    if (this.props.stylesheet) {
      this.fs.copyTpl(
        this.templatePath('stylesheet.scss.template'),
        this.destinationPath(this.props.componentName + '.scss'),
        this.props
      );
    }
  },
});
