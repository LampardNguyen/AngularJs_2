System.register(['angular2/core', 'angular2/router', 'app/ts/login/login.component', 'app/ts/main/main.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, login_component_1, main_component_1;
    var rootComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (main_component_1_1) {
                main_component_1 = main_component_1_1;
            }],
        execute: function() {
            rootComponent = (function () {
                function rootComponent() {
                }
                rootComponent = __decorate([
                    core_1.Component({
                        selector: 'root',
                        templateUrl: 'app/views/root/_root.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([{
                            path: '/Login',
                            name: 'Login',
                            component: login_component_1.LoginComponent,
                            useAsDefault: true
                        }, {
                            path: '/Main/...',
                            name: 'Main',
                            component: main_component_1.MainComponent
                        }]), 
                    __metadata('design:paramtypes', [])
                ], rootComponent);
                return rootComponent;
            }());
            exports_1("rootComponent", rootComponent);
        }
    }
});
//# sourceMappingURL=root.component.js.map