import {
    Component
}
from 'angular2/core'; import {
    RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteParams
}
from 'angular2/router';
@Component({
        selector: 'hero-list',
        templateUrl: './app/html/heroList.component.html',
        directives: [ROUTER_DIRECTIVES]
    })
export class heroListComponent {
    protected m = {};
}