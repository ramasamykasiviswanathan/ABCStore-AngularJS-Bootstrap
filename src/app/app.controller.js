(function () {
	'use strict'
	angular.module('app.controller', ['app.utils'])
	.controller('ItemsListController', ItemsListController)
	.controller('ProductController', ProductController)
	.controller('CartController', CartController)
	.controller('CheckoutController', CheckoutController);

	ItemsListController.$inject=["getProductInfoFactory","itemList_Constant","$log"];

	function ItemsListController(getProductInfoFactory,itemList_Constant, $log)
	{
		var items = this;
		$log.debug("ItemsListController");
		items.list = getProductInfoFactory;
		itemList_Constant.itemList = items.list;
	}

	ProductController.$inject=["$routeParams","itemList_Constant","CartDAO","Utils","$log"];
	function ProductController($routeParams, itemList_Constant, CartDAO, Utils, $log)
	{
		$log.debug("ProductController");
		var product = this;
		product.productDetail = itemList_Constant.itemList.find(function (item)
		{
			$log.debug("ProductController.productDetail");
			return item.id == $routeParams.productId;
		});

		product.addToCart = function addToCart(message)
		{
			$log.debug("ProductController.addToCart");
			if(!Utils.isUndefinedOrNull(message))
			{
				message.noOfItems = 1;
				CartDAO.addToCart(message);
			}
		};
	}

	CartController.$inject=["CartDAO","Utils", "$location", "$log"];
	function CartController(CartDAO, Utils, $location, $log)
	{
		$log.debug("CartController");
		var vm = this;
		vm.carts = CartDAO.getCart();

		vm.deleteFromCart = function deleteFromCart(message)
		{
			$log.debug("CartController.deleteFromCart");
			CartDAO.removeFromCart(message);
			$log.log("cart"+JSON.stringify(CartDAO.getCart()));
			vm.carts = CartDAO.getCart();
		};

		vm.calculateTotalPrice = function calculateTotalPrice(cartList)
		{
			$log.debug("CartController.calculateTotalPrice");
			let sum = 0;
			for(var i =0, len = cartList.length; i<len; i++)
			{
				if(angular.isNumber(cartList[i].noOfItems))
				{
					sum = sum + (cartList[i].price * cartList[i].noOfItems);
				}
			}
			return sum;
		}

		vm.totalProducts = function totalProducts(cartList)
		{
			$log.debug("CartController.totalProducts");
			let sum =0;
			for(var i =0, len = cartList.length; i<len; i++)
			{
				if(angular.isNumber(cartList[i].noOfItems))
				{
					sum += cartList[i].noOfItems;
				}
			}
			return sum;
		}

		vm.submitCheckout = function submitCheckout(cartList)
		{
			$log.debug("CartController.submitCheckout");
			for(var i=0, len = cartList.length; i<len; i++)
			{
				CartDAO.addToCart(cartList[i]);
			}
			$location.path("/checkout");
		}
	}

	CheckoutController.$inject=["CartDAO","Utils","$log"];
	function CheckoutController(CartDAO, Utils, $log)
	{
		$log.debug("CheckoutController");
		var vm = this;
		vm.checkoutList = CartDAO.getCart();
	}
})()