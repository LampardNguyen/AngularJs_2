import {
	Component
}
from 'angular2/core';
import {
	RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteParams
}
from 'angular2/router';
import {
	LoginComponent
}
from 'app/ts/login/login.component';
import {
	MainComponent
}
from 'app/ts/main/main.component';
@
Component({
	selector: 'root',
	templateUrl: 'app/views/root/_root.html',
	directives: [ROUTER_DIRECTIVES]
})@ RouteConfig([{
	path: '/Login',
	name: 'Login',
	component: LoginComponent,
	useAsDefault: true
}, {
	path: '/Main/...',
	name: 'Main',
	component: MainComponent
}])
export class rootComponent {}