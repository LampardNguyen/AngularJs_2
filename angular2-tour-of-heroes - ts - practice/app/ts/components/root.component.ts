import {
    Component
}
from 'angular2/core';
import {
    RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteParams
}
from 'angular2/router';
import {
    headerComponent
}
from './header.component';
import {
    sidebarComponent
}
from './sidebar.component';
import {
    heroListComponent
}
from './heroList.component';
import {
    heroDetailComponent
}
from './heroDetail.component';

@Component({
    selector: 'main-container',
    templateUrl: './app/html/root.component.html',
    directives: [headerComponent, sidebarComponent, ROUTER_DIRECTIVES]
})
@RouteConfig([{
    path: '/HeroList',
    name: 'HeroList',
    component: heroListComponent,
    useAsDefault: true
}, {
        path: '/HeroDetail',
        name: 'HeroDetail',
        component: heroDetailComponent
    })
export class rootComponent {
    title = 'Tour of Heroes';
}