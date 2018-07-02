import {
    Component
}
from 'angular2/core';
import {
    RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteParams
}
from 'angular2/router';
@Component({
    selector: 'sidebar-container',
    templateUrl: './app/html/sidebar.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class sidebarComponent {

}