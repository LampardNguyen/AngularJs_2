System.register(['angular2/platform/browser', 'angular2/router', './root.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, router_1, root_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (root_component_1_1) {
                root_component_1 = root_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(root_component_1.rootComponent, [
                router_1.ROUTER_PROVIDERS
            ]);
        }
    }
});
//# sourceMappingURL=index.js.map