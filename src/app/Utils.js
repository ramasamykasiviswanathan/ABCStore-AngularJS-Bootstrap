(function (){
	/**
	*  Module
	*
	* Description
	*/
	angular.module('app.utils', []).
		factory("Utils", Utils)
		.factory("CartDAO",CartDAO);

	Utils.$inject=["$log"];
	function Utils($log)
	{
		$log.debug("Utils");
		function isUndefinedOrNull(Obj)
		{
			$log.debug("Utils.isUndefinedOrNull");
			return angular.isUndefined(Obj) || Obj == null;
		}
		return {
			isUndefinedOrNull: isUndefinedOrNull
		}
	}

	CartDAO.$inject=["Utils","$log"];
	function CartDAO(Utils, $log)
	{
		$log.debug("CartDAO");
		var cart =[];
		function getCart()
		{
			$log.debug("CartDAO.getCart");
			return cart;
		}

		function addToCart(message)
		{
			$log.debug("CartDAO.addToCart");
			if(!Utils.isUndefinedOrNull(message))
			{
				let index = -1;
				for(let i=0, len = cart.length; i<len ; i++)
				{
					if(cart[i].id == message.id)
					{
						index = i;
						break;
					}
				}
				let deleteCount=1;
				if(index == -1)
				{
					deleteCount = 0;
					index = cart.length - 1;
				}
				cart.splice(index,deleteCount,message);
			}
		}

		function removeFromCart(message)
		{
			$log.debug("CartDAO.removeFromCart");
			if(!Utils.isUndefinedOrNull(message))
			{		
				message.noOfItems = 1;
				let index = -1;
				for(let i=0, len = cart.length; i<len ; i++)
				{
					if(cart[i].id == message.id)
					{
						index = i;
						break;
					}
				}
				let deleteCount=1;
				if(index == -1)
				{
					deleteCount = 0;
					index = cart.length - 1;
				}
				cart.splice(index,deleteCount);
			}
		}

		return {
			addToCart : addToCart,
			removeFromCart : removeFromCart,
			getCart : getCart
		}
	}
})()