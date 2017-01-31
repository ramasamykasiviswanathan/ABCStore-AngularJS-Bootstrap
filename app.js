(function () {
	'use strict'
	angular.module('mainApp', ['ngRoute','app.controller','app.utils'])
			.config(routeConfig)
			.constant('itemList_Constant', {
				itemList:[]
			});
			// .factory('getProductInfoFactory', getProductInfoFactory );

	routeConfig.$inject=["$routeProvider","$locationProvider"];
	function routeConfig($routeProvider, $locationProvider)
	{
		$routeProvider.when("/",
		{
			controller:'ItemsListController',
			controllerAs:'items',
			templateUrl:'src/templates/itemsListTable.html',
			resolve:
			{
				getProductInfoFactory : getProductInfoFactory
			}
		})
		.when("/product/:productId",
		{
			controller:'ProductController',
			controllerAs:'product',
			templateUrl:'src/templates/productDetails.html'
		})
		.when("/cart",
		{
			controller:'CartController',
			controllerAs:'myCart',
			templateUrl:'src/templates/cartDetail.html'
		})
		.when("/checkout",
		{
			controller:'CheckoutController',
			controllerAs: 'checkout',
			templateUrl:'src/templates/checkout.htm'
		})
		.otherwise({
			redirectTo:'/'
		});
		// $locationProvider.hashPrefix('');
		// $locationProvider.html5Mode(true).hashPrefix('#');
	}


	getProductInfoFactory.$inject=["$http","$log"];
	function getProductInfoFactory($http, $log)
	{
		// console.log("getProductInfoFactory is initalised");
		// return {
		// 	getProductInfo: function()
		// 	{
				return $http.get("data/products_data.json").then(function successCallback(response)
				{
					$log.debug("getProductInfoFactory.success");
					return response.data;
				}, function errorCallBack(response)
				{
					$log.debug("getProductInfoFactory.error "+response);
				});
		// 	}
		// };
	}
})()