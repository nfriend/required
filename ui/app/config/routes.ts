const routeConfig = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {

    $stateProvider.state({
        name: 'required',
        abstract: true,
        template: '<main-layout></main-layout>'
    });

    $stateProvider.state({
        name: 'required.home',
        url: '/',
        template: '<main-layout></main-layout>'
    });

    $urlRouterProvider.otherwise('/');
}

export { routeConfig };