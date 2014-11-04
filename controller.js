(function() {
  var app = angular.module('msgApp', []);
  
	app.factory('rosterIdService',function($rootScope) {
		var sharedService = {};

		sharedService.id = '';

		sharedService.prepForBroadcast = function(msg) {
			this.id = msg;
			this.broadcastItem();
		};

		sharedService.broadcastItem = function() {
			$rootScope.$broadcast('handleBroadcast');
		};

		return sharedService;
	});
	
	var myData = {
		"senderUsername" : "Name",
        "createdDate" : new Date().getTime(),
        "message" : "Hi"
	};

	app.controller("MessageController",function(){
		$.ajax({
			type : 'GET',
			data : myData,
			datatype : JSON
		}).done(function(msg) {
			// 		the JSON respnse we expect is {	// 	roster = "value": {			// 		
			// 		"requestId": 37824,
			// 		"communicationServices": [
			// 			{
			// 				"message": "Your call request has been sent to Ryan S..",
			// 				"id": 121897,
			// 				"serviceId": 104,
			// 				"createdDate": 1390455683000,
			// 				"imageUrls": [],		
			// 			    "isSystemGenerated": true,
			// 				"phonenumber": "",
			// 				"senderUsername": "Person"
			// 			}				
			// 		],
			// 		"senderUsers": [
			// 			{
			// 				"status": 0,
			// 				"username": "rsponse",
			// 				"imageUrl": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRyHVhs-SPWWnqhM4KZCg3cxvhQ5ZHGxJGIrbZ2u9r8yt3D-L_a",
			// 				"preferredName": "Ryan S.",
			// 				"userRole": "Status"
			// 			}				
			// 		]
			// 	},
			// 	"message": "",
			// 	"error": null,
			// 	"errors": [],
			// 	"appVersion": "",
			// 	"resultCode": 0
			// };
            $scope.userlist= msg;
        }).fail(function(jqXHR, textStatus) {
            alert( "Request failed: " + textStatus );
        });

		this.currentActiveUser = 0;
		
		this.messages = conversation;
		this.id=0;
		
		this.getImage = function(userId){
			for(var i=0; i<this.messages.value.senderUsers.length; i++){
				if(this.messages.value.senderUsers[i].username === userId){
					if(this.messages.value.senderUsers[i].imageUrl.length>0 )
						return this.messages.value.senderUsers[i].imageUrl;
					else
						return "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTjK7J9oe4XXUiykZDV_DHXi-wP3a8J0caIIRPc8lvyh-KYHtOx";
				}
			}
		}
		
		this.isactive = function(tabid){
			return tabid==this.currentActiveUser;
		}
		
		this.loadConvo = function(userId){
			this.currentActiveUser = userId;
			if(this.messages == conversation){
				this.messages=conversation2;
			}
			else{
				this.messages=conversation;
			}
			
			
			//make ajax call to get the conversation
			//alter the model messages
			if($(window).width()<=480)
				window.location.href="#page2";
		}
	
		this.getName = function(userId){
			for(var i=0; i<this.messages.value.senderUsers.length; i++){
				if(this.messages.value.senderUsers[i].username === userId){
					return this.messages.value.senderUsers[i].preferredName;
				}
			}
		}
	});
  
	angular.module('msgApp').filter('unsafe', function($sce) {
		return function(val) {
			return $sce.trustAsHtml(val);
		};
	});
	
	angular.module('msgApp').filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';
            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;
            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }
            return value + (tail || ' …');
        };
    });
	
	var conversation2 = 
	{
		"value": {
			"id": 43005,			
			"requestId": 37824,
			"communicationServices": [
				{
					"message": "Your request is accepted",									
					"createdDate": 1390455683000,
					"imageUrls": [],
					"isRead": 1,
					"isToCustomer": 1,
					"isSystemGenerated": true,
					"phonenumber": "",
					"senderUsername": "Person"
				},
				{
					"message": "I accepted your call request.",					
					"createdDate": 1390455706000,
					"imageUrls": [],
					"isRead": 1,
					"isToCustomer": 1,
					"isSystemGenerated": true,
					"phonenumber": "",
					"senderUsername": "Person"
				},
				{
					"message": "Hi",					
					"createdDate": 1390455742000,
					"imageUrls": [],
					"isRead": 1,
					"isToCustomer": 1,
					"isSystemGenerated": true,
					"phonenumber": "",
					"senderUsername": "Person"
				}
			],
			"senderUsers": [
				{
					"status": 0,
					"username": "rsponse",
					"imageUrl": "http://www.jucoolimages.com/images/thanku/thank_you_18.gif",
					"preferredName": "David",
					"userRole": "Engineer"
				},				
				{
					"status": 1,
					"username": "Member",
					"imageUrl": "http://www.jucoolimages.com/images/thanku/thank_you_18.gif",
					"preferredName": "Buy Product",
					"userRole": "Admin"
				}
			]
		},
		"message": "",
		"error": null,
		"errors": [],
		"appVersion": "",
		"resultCode": 0
	};
  
  var conversation = 
	{
		"value": {
			"id": 43005,
			"status": 20,
			"requestId": 37824,
			"communicationServices": [
				{
					"message": "Your call request has been accepted",
					"createdDate": 1390455683000,
					"imageUrls": [],
					"isRead": 1,
					"isToCustomer": 1,
					"isSystemGenerated": true,
					"phonenumber": "",
					"senderUsername": "Person"
				},
				{
					"message": "Thanks for using me",
					"createdDate": 1390455839000,
					"imageUrls": [
						"http://www.jucoolimages.com/images/thanku/thank_you_18.gif"
					],
					"isRead": 1,
					"isToCustomer": 1,
					"isSystemGenerated": false,
					"phonenumber": "",
					"senderUsername": "carlos"
				},
				{
					"message": "you still there?",
					"createdDate": 1408379469000,
					"imageUrls": [],
					"isRead": 1,
					"isToCustomer": 0,
					"isSystemGenerated": false,
					"phonenumber": "",
					"senderUsername": "20025"
				},
				{
					"message": "Thanks for using me",
					"createdDate": 1390455839000,
					"imageUrls": [
						"http://www.jucoolimages.com/images/thanku/thank_you_18.gif"
					],
					"isRead": 1,
					"isToCustomer": 1,
					"isSystemGenerated": false,
					"phonenumber": "",
					"senderUsername": "rsponse"
				},
				{
					"message": "you still there?",
					"createdDate": 1408379469000,
					"imageUrls": [],
					"isRead": 1,
					"isToCustomer": 0,
					"isSystemGenerated": false,
					"phonenumber": "",
					"senderUsername": "1917"
				},
				{
					"message": "Thanks for calling me",
					"createdDate": 1390455775000,
					"imageUrls": [],
					"isRead": 1,
					"isToCustomer": 0,
					"isSystemGenerated": false,
					"phonenumber": "",
					"senderUsername": "1917214"
				},
				{
					"message": "Thanks for using Member Assist! Feel free to reach out to me again if you have any further questions!",
					"id": 121901,
					"serviceId": 102,
					"createdDate": 1390455839000,
					"imageUrls": [
						"http://www.jucoolimages.com/images/thanku/thank_you_18.gif"
					],
					"isRead": 1,
					"isToCustomer": 1,
					"isSystemGenerated": false,
					"phonenumber": "",
					"senderUsername": "rsponse"
				},
			],
			"senderUsers": [
				{
					"status": 0,
					"username": "Jack",
					"imageUrl": "http://www.jucoolimages.com/images/thanku/thank_you_18.gif",
					"preferredName": "Ryan S.",
					"userRole": "Person"
				},
				{
					"status": 1,
					"username": "Member",
					"imageUrl": "http://www.jucoolimages.com/images/thanku/thank_you_18.gif",
					"preferredName": "Person",
					"userRole": "Admin"
				}
			]
		},
		"message": "",
		"error": null,
		"errors": [],
		"appVersion": "",
		"resultCode": 0
	};

  var roster=
	  {
		"value": {
			"communications": 
			[
				{					
					"updatedDate": 1408397468000,
					"numberOfUnread": 0,
					"latestMessage": "you still there?",
					"latestAssociate": {
						"name": "Brown.",
						"username": "Henry",						
						"onlineStatus": 0,
						"departmentName": "Appliances",
						"email": "anuroop@gmail.com",
						"picture": "http://www.jucoolimages.com/images/thanku/thank_you_18.gif"
					}
				},
				{
					"updatedDate": 1399344199000,
					"numberOfUnread": 0,
					"latestMessage": "Draft",
					"latestAssociate": {
						"name": "Ryan S.",
						"username": "richie",				
						"onlineStatus": 0,
						"departmentName": "Appliances",
						"email": "rsponse@searshc.com",
						"picture": "http://www.jucoolimages.com/images/thanku/thank_you_18.gif"
					}
				},
				{
					"updatedDate": 1387914733000,
					"numberOfUnread": 0,
					"latestMessage": "What are your hours today? Merry Christmas!",
					"latestAssociate": {
						"name": "Member",
						"username": "Product",
						"storeName": "",
						"onlineStatus": 1,
						"departmentName": "",
						"email": "anuroop@gmail.com",
						"picture": "http://www.jucoolimages.com/images/thanku/thank_you_18.gif"
					}
				},
				{
					"updatedDate": 1386898362000,
					"numberOfUnread": 0,
					"latestMessage": "Thanks for using Text Services",
					"latestAssociate": {
						"name": "Ryan S.",
						"username": "Hex",
						"onlineStatus": 0,
						"departmentName": "Appliances",
						"email": "rsponse@searshc.com",
						"picture": "http://www.jucoolimages.com/images/thanku/thank_you_18.gif"
					}
				},
				{
					"updatedDate": 1385101650000,
					"numberOfUnread": 0,
					"latestMessage": "Thank you for using message",
					"latestAssociate": {
						"name": "Ryan S.",
						"username": "hi",
						"storeName": "Woodfield Mall",
						"onlineStatus": 0,
						"departmentName": "Appliances",
						"email": "rsponse@searshc.com",
						"picture": "http://www.jucoolimages.com/images/thanku/thank_you_18.gif"
					}
				},
				{
					"updatedDate": 1386898362000,
					"numberOfUnread": 0,
					"latestMessage": "Thanks dude!",
					"latestAssociate": {
						"name": "Ryan S.",
						"username": "hello",
						"storeName": "Woodfield Mall",
						"onlineStatus": 0,
						"departmentName": "Appliances",
						"email": "rsponse@searshc.com",
						"picture": "http://www.jucoolimages.com/images/thanku/thank_you_18.gif"
					}
				},
				{
					"updatedDate": 1385101650000,
					"numberOfUnread": 0,
					"latestMessage": "Thank you for messaging",
					"latestAssociate": {
						"name": "Ryan S.",
						"username": "John",
						"storeName": "Woodfield Mall",
						"onlineStatus": 0,
						"departmentName": "Appliances",
						"email": "rsponse@searshc.com",
						"picture": "http://www.jucoolimages.com/images/thanku/thank_you_18.gif"
					}
				},
				{
					"updatedDate": 1385048787000,
					"numberOfUnread": 0,
					"latestMessage": "Check this out",
					"latestAssociate": {
						"name": "Ryan S.",
						"username": "hex",
						"storeName": "Woodfield Mall",
						"onlineStatus": 0,
						"departmentName": "Appliances",
						"email": "rsponse@searshc.com",
						"picture": "http://www.jucoolimages.com/images/thanku/thank_you_18.gif"
					}
				},
				{
					"status": 0,
					"updatedDate": 1386913419000,
					"numberOfUnread": 0,
					"latestMessage": "Thank you for using this",
					"latestAssociate": {
						"name": "Shabzz",
						"username": "Vix",
						"storeName": "Product",
						"onlineStatus": 0,
						"departmentName": "Appliances",
						"picture": "http://www.jucoolimages.com/images/thanku/thank_you_18.gif"
					}
				},				
			],
			"totalNumber": 34,
			"numberOfUnread": 0
		},
		"message": "",
		"error": null,
		"errors": [],
		"appVersion": "3.7.3",
		"resultCode": 0
	}
})();
var currentTab="";


function highlight(obj){
	$(".content-left li").css({"background-color":"#f9f9f9"});
	$(obj).css({"background-color":"#ccc"});
}
