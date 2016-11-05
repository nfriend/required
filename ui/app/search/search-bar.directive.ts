import { SearchBarController } from './search-bar.controller';

export class SearchBarDirective {
    public static injectionName = 'searchBar';
    public template = require('./search-bar.html');
    public controller = SearchBarController;
    public bindToController = true;
    public controllerAs = 'vm';
    public scope = {};
}