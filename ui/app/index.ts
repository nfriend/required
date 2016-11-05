require('script!../node_modules/jquery/dist/jquery.js');
require('script!../node_modules/angular/angular.js');
require('script!../node_modules/angular-aria/angular-aria.js');
require('script!../node_modules/angular-animate/angular-animate.js');
require('script!../node_modules/angular-material/angular-material.js');
require('script!../node_modules/angular-ui-router/release/angular-ui-router.js');

import { MainLayoutDirective } from './main-layout/main-layout.directive';

import { routeConfig } from './config/routes';

angular
    .module('required',
    [
        'ngAria',
        'ngAnimate',
        'ngMaterial',
        'ui.router'
    ])
    .directive(MainLayoutDirective.injectionName, () => new MainLayoutDirective)
    .config(['$stateProvider', '$urlRouterProvider', routeConfig]);