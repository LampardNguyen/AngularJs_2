import {
	Component
}
from 'angular2/core';
import { FORM_DIRECTIVES } from 'angular2/common';
import {
	NgForm
}
from 'angular2/common';
import {
	Router
}
from 'angular2/router';@
Component({
	selector: 'login',
	templateUrl: 'app/views/login/_login.html',
	directives : [FORM_DIRECTIVES]
})
export class LoginComponent {
	constructor(private _router: Router) {}
	private m = {};
	/**
	 * [sumbitLogin description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	private sumbitLogin = function() {
		console.log('aaaaaaaaaaaaaa');
		let link = ['Main','ProjectList'];
		this._router.navigate(link);
	};
}