angular.module('taaModule').directive('knob', function() {
	return {
		link: function(scope, iElement, iAttrs) {
			setTimeout(function() {
				iElement.knob({
					draw: function() {
						$(this.i).css('font-size', '8pt');
					}
				});
			}, 100);
		}
	};
});