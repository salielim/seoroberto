

// Always use an IIFE, i.e., (function() {})();
(function () {
    angular
        .module("DMS")          // to call an angular module, omit the second argument ([]) from the angular.module()
                                // syntax this syntax is called the getter syntax
        .controller("RegCtrl", RegCtrl);    // angular.controller() attaches a controller to the angular module
                                            // specified as you can see, angular methods are chainable


    // Dependency injection. An empty [] means RegCtrl does not have dependencies. Here we inject DataService so
    // RegCtrl can call services related to department.
    RegCtrl.$inject = ['$window', 'DataService'];


    // RegCtrl function declaration. A function declaration uses the syntax: functionName([arg [, arg [...]]]){ ... }
    // RegCtrl accepts the injected dependency as a parameter. We name it DataService for consistency, but you may
    // assign any name
    function RegCtrl($window, DataService) {

        // Declares the var vm (for ViewModel) and assigns it the object this (in this case, the RegCtrl)
        // Any function or variable that you attach to vm will be exposed to callers of RegCtrl, e.g., register.html
        var vm = this;


        // Exposed data models -----------------------------------------------------------------------------------------
        // Creates a department object. We expose the department object by attaching it to the vm. This allows us to
        // apply two-way data-binding to this object by using ng-model in our view (i.e., index.html)
        vm.department = {
            id: ""
            , name: ""
        };
        // Creates a status object. We will use this to display appropriate success or error messages.
        vm.status = {
            message: "",
            code: ""
        };

        // Exposed functions ----------------------------------------------------------------------------------------
        // Exposed functions can be called from the view. e.g., to call the vm.register from our view (register.html),
        // code: ctrl.register()
        vm.register = register;


        // Function declaration and definition -------------------------------------------------------------------------
        function register() {
            // Calls alert box and displays registration information
            alert("The registration information you sent are \n" + JSON.stringify(vm.department));

            // Prints registration information onto the client console
            console.log("The registration information you sent were:");
            console.log("Department id: " + vm.department.id);
            console.log("Department name: " + vm.department.name);

            // We call DataService.insertDept to handle registration of department information. The data sent to this
            // function will eventually be inserted into the database.
            DataService
                .insertDept(vm.department)
                .then(function (result) {
                    console.log("result " + JSON.stringify(result));
                    $window.location.assign('/app/registration/thanks.html');
                })
                .catch(function (err) {
                    console.log("error " + JSON.stringify(err));
                    vm.status.message = err.data.name;
                    vm.status.code = err.data.parent.errno;
                });
        } // END function register()
    } // END RegCtrl

})();