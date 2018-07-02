import {
	Component
}
from 'angular2/core';
import {
	ProjectListComponent
}
from 'app/ts/projectList/projectList.component';
import {
	RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteParams, Router, RouterOutlet
}
from 'angular2/router';@
Component({
	selector: 'main',
	templateUrl: 'app/views/main/_main.html',
	directives: [ROUTER_DIRECTIVES, RouterOutlet]
})@
RouteConfig([{
	path: 'ProjectList',
	name: 'ProjectList',
	component: ProjectListComponent
}])
export class MainComponent {
	private m = {};
}