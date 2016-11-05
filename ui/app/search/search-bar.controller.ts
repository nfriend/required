export class SearchBarController {
    public static injectionName = 'SearchBarController';
    public static $inject = ['$q'];

    constructor(private $q: ng.IQService) {

    }

    private items = [
        { display: 'Iowa' },
        { display: 'Nebraska' },
        { display: 'California' },
        { display: 'Nevada' },
        { display: 'Washington' },
        { display: 'Maine' },
        { display: 'Colorado' }
    ];

    public getMatches(searchText: string): ng.IPromise<any> {
        const deferred = this.$q.defer();
        const filteredItems = this.items.filter(s => s.display.toLowerCase().indexOf(searchText.toLowerCase().trim()) !== -1);
        deferred.resolve(filteredItems);
        return deferred.promise;
    }
}