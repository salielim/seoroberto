// Always use an IIFE, i.e., (function() {})();
(function () {
    // Creates a new module
    // When setting (creating) an angular module, you need to specify the second argument ([ ... ])
    // Without this argument, we are telling Angular that what we want to do is to get an already existing module
    angular
        .module("DMS", [
            "ngMessages" // The ngMessages module provides a simple way to show/hide error messages within your form
                         // It works in conjunction with the ngModel $error object.
            , "ngAnimate" // ngAnimate module supports both CSS-based and JS-based animations via callback hooks
        ]);
})();