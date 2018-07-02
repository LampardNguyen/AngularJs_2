import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {rootComponent} from 'app/ts/root/root.component';

bootstrap(rootComponent, [
  ROUTER_PROVIDERS
]);