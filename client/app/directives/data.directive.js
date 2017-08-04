(function () {
    angular
        .module("SEO")
        .directive('stSelectMultiple', [function () {
            return {
                restrict: 'E',
                require: '^stTable',
                scope: {
                    collection: '=',
                    predicate: '@',
                    predicateExpression: '='
                },
                templateUrl: 'app/protected/data/stSelectMultiple.html',
                link: function (scope, element, attr, table) {
                    scope.dropdownLabel = '';
                    scope.filterChanged = filterChanged;

                    initialize();

                    function initialize() {
                        bindCollection(scope.collection);
                    }

                    function getPredicate() {
                        var predicate = scope.predicate;
                        if (!predicate && scope.predicateExpression) {
                            predicate = scope.predicateExpression;
                        }
                        return predicate;
                    }

                    function getDropdownLabel() {
                        var allCount = scope.distinctItems.length;

                        var selected = getSelectedOptions();

                        if (allCount === selected.length || selected.length === 0) {
                            return 'All';
                        }

                        if (selected.length === 1) {
                            return selected[0];
                        }

                        return selected.length + ' items';
                    }

                    function getSelectedOptions() {
                        var selectedOptions = [];

                        angular.forEach(scope.distinctItems, function (item) {
                            if (item.selected) {
                                selectedOptions.push(item.value);
                            }
                        });

                        return selectedOptions;
                    }

                    function bindCollection(collection) {
                        var predicate = getPredicate();
                        var distinctItems = [];

                        angular.forEach(collection, function (item) {
                            var value = item[predicate];
                            fillDistinctItems(value, distinctItems);
                        });

                        distinctItems.sort(function (obj, other) {
                            if (obj.value > other.value) {
                                return 1;
                            } else if (obj.value < other.value) {
                                return -1;
                            }
                            return 0;
                        });

                        scope.distinctItems = distinctItems;

                        filterChanged();
                    }

                    function filterChanged() {
                        scope.dropdownLabel = getDropdownLabel();

                        var predicate = getPredicate();

                        var query = {
                            matchAny: {}
                        };

                        query.matchAny.items = getSelectedOptions();
                        var numberOfItems = query.matchAny.items.length;
                        if (numberOfItems === 0 || numberOfItems === scope.distinctItems.length) {
                            query.matchAny.all = true;
                        } else {
                            query.matchAny.all = false;
                        }

                        table.search(query, predicate);
                    }

                    function fillDistinctItems(value, distinctItems) {
                        if (value && value.trim().length > 0 && !findItemWithValue(distinctItems, value)) {
                            distinctItems.push({
                                value: value,
                                selected: true
                            });
                        }
                    }

                    function findItemWithValue(collection, value) {
                        var found = _.find(collection, function (item) {
                            return item.value === value;
                        });

                        return found;
                    }
                }
            }
        }])
        .filter('customFilter', ['$filter', function ($filter) {
            var filterFilter = $filter('filter');
            var standardComparator = function standardComparator(obj, text) {
                text = ('' + text).toLowerCase();
                return ('' + obj).toLowerCase().indexOf(text) > -1;
            };

            return function customFilter(array, expression) {
                function customComparator(actual, expected) {

                    var isBeforeActivated = expected.before;
                    var isAfterActivated = expected.after;
                    var isLower = expected.lower;
                    var isHigher = expected.higher;
                    var higherLimit;
                    var lowerLimit;
                    var itemDate;
                    var queryDate;

                    if (ng.isObject(expected)) {
                        //exact match
                        if (expected.distinct) {
                            if (!actual || actual.toLowerCase() !== expected.distinct.toLowerCase()) {
                                return false;
                            }

                            return true;
                        }

                        //matchAny
                        if (expected.matchAny) {
                            if (expected.matchAny.all) {
                                return true;
                            }

                            if (!actual) {
                                return false;
                            }

                            for (var i = 0; i < expected.matchAny.items.length; i++) {
                                if (actual.toLowerCase() === expected.matchAny.items[i].toLowerCase()) {
                                    return true;
                                }
                            }

                            return false;
                        }

                        //date range
                        if (expected.before || expected.after) {
                            try {
                                if (isBeforeActivated) {
                                    higherLimit = expected.before;

                                    itemDate = new Date(actual);
                                    queryDate = new Date(higherLimit);

                                    if (itemDate > queryDate) {
                                        return false;
                                    }
                                }

                                if (isAfterActivated) {
                                    lowerLimit = expected.after;


                                    itemDate = new Date(actual);
                                    queryDate = new Date(lowerLimit);

                                    if (itemDate < queryDate) {
                                        return false;
                                    }
                                }

                                return true;
                            } catch (e) {
                                return false;
                            }

                        } else if (isLower || isHigher) {
                            //number range
                            if (isLower) {
                                higherLimit = expected.lower;

                                if (actual > higherLimit) {
                                    return false;
                                }
                            }

                            if (isHigher) {
                                lowerLimit = expected.higher;
                                if (actual < lowerLimit) {
                                    return false;
                                }
                            }

                            return true;
                        }
                        //etc

                        return true;

                    }
                    return standardComparator(actual, expected);
                }

                var output = filterFilter(array, expression, customComparator);
                return output;
            };
        }])
})();