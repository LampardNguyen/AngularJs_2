angular.module('taaModule').directive('taaDaterange', ['$compile', '$parse', '$filter', function ($compile, $parse, $filter) {

    return {
        restrict: 'EA',
        require: 'ngModel',
        link: function ($scope, $element, $attributes, ngModel) {
            var options = {};
            $scope.locale = {
                showDropdowns:true,
                    applyLabel: '適用',
                    cancelLabel: 'クリア',
                    fromLabel: 'From',
                    toLabel: 'To',
                    weekLabel: '週',
                    customRangeLabel: 'Custom Range',
                    daysOfWeek: ["日", "月", "火", "水", "木", "金", "土"],
                    monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                };
            options.format = $attributes.format || 'YYYY/MM/DD';
            options.separator = $attributes.separator || ' - ';
            options.minDate = $attributes.minDate && moment($attributes.minDate);
            options.maxDate = $attributes.maxDate && moment($attributes.maxDate);
            options.dateLimit = $attributes.limit && moment.duration.apply(this, $attributes.limit.split(' ').map(function (elem, index) { return index === 0 && parseInt(elem, 10) || elem; }) );
            options.ranges = $attributes.ranges && $parse($attributes.ranges)($scope);
            //options.locale = $attributes.locale && $parse($attributes.locale)($scope);
            options.locale = $scope.locale;
            options.opens = $attributes.opens || 'right';
            options.showWeekNumbers = $attributes.showWeekNumbers || false;
            options.daysHoliday = angular.fromJson(sessionStorage.getItem('holiday'));
            function format(date) {
                return date.format(options.format);
            }

            function formatted(dates) {
                return [format(dates.startDate), format(dates.endDate)].join(options.separator);
            }

            ngModel.$formatters.unshift(function (modelValue) {
                if (!modelValue) return '';
                return modelValue;
            });

            ngModel.$parsers.unshift(function (viewValue) {
                return viewValue;
            });

            $scope.$watch($attributes.ngModel, function (modelValue) {
                if (!modelValue || (!modelValue.startDate)) {
                    //ngModel.$setViewValue({ startDate: moment().startOf('day').toDate(), endDate: moment().startOf('day').toDate() });
                    return;
                }
                $element.data('daterangepicker').startDate = moment(modelValue.startDate);
                $element.data('daterangepicker').endDate = moment(modelValue.endDate);
                $element.data('daterangepicker').updateView();
                $element.data('daterangepicker').updateCalendars();
                $element.data('daterangepicker').updateInputText();

                angular.element('#fromDate').html(ngModel.$modelValue.startDate);
                angular.element('#toDate').html(ngModel.$modelValue.endDate);
            });

            $element.daterangepicker(options, function(start, end) {
                $scope.$apply(function () {
                    ngModel.$setViewValue({ startDate: $filter('date')(start.toDate(), 'yyyy/MM/dd'), endDate: $filter('date')(end.toDate(), 'yyyy/MM/dd') });
                    angular.element('#fromDate').html($filter('date')(start.toDate(), 'yyyy/MM/dd'));
                    angular.element('#toDate').html($filter('date')(end.toDate(), 'yyyy/MM/dd'));
                });
            });
            angular.element('.a-daterange-from').on('cancel.daterangepicker', function(ev, picker) {
                $scope.$apply(function () {
                    ngModel.$setViewValue({
                        startDate: $filter('date')(DateUtils.getPreviousMonth(), "yyyy/MM/dd"),
                        endDate: $filter('date')(DateUtils.getCurrentDate(), "yyyy/MM/dd")
                    });
                });
                $scope.model.form.regisDate.startDate = null;
                $scope.model.form.regisDate.endDate = null;
                angular.element('#fromDate').html('');
                angular.element('#toDate').html('');
            });
            angular.element('.a-daterange-to').on('cancel.daterangepicker', function(ev, picker) {
                $scope.$apply(function () {
                    ngModel.$setViewValue({
                        startDate: $filter('date')(DateUtils.getPreviousMonth(), "yyyy/MM/dd"),
                        endDate: $filter('date')(DateUtils.getCurrentDate(), "yyyy/MM/dd")
                    });
                });
                $scope.model.form.regisDate.startDate = null;
                $scope.model.form.regisDate.endDate = null;
                angular.element('#fromDate').html('');
                angular.element('#toDate').html('');
            });
        }
    };
}])