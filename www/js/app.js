angular.module("gst", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","gst.controllers", "gst.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "" ;
		$rootScope.appLogo = "data/images/header/logo.png" ;
		$rootScope.appVersion = "1.0" ;

		$ionicPlatform.ready(function() {
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "gst",
				storeName : "gst",
				description : "The offline datastore for GST app"
			});


			//required: cordova plugin add cordova-plugin-network-information --save
			$interval(function(){
				if ( typeof navigator == "object" && typeof navigator.connection != "undefined"){
					var networkState = navigator.connection.type;
					if (networkState == "none") {
						$window.location = "retry.html";
					}
				}
			}, 5000);

		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				var confirmPopup = $ionicPopup.confirm({
					title: "Confirm Exit",
					template: "Are you sure you want to exit?"
				});
				confirmPopup.then(function (close){
					if(close){
						ionic.Platform.exitApp();
					}
				});
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])





.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?timesofgst\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("gst",{
		url: "/gst",
			abstract: true,
			templateUrl: "templates/gst-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("gst.about_us", {
		url: "/about_us",
		views: {
			"gst-side_menus" : {
						templateUrl:"templates/gst-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gst.bookmark", {
		url: "/bookmark",
		views: {
			"gst-side_menus" : {
						templateUrl:"templates/gst-bookmark.html",
						controller: "bookmarkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gst.chapter", {
		url: "/chapter",
		cache:false,
		views: {
			"gst-side_menus" : {
						templateUrl:"templates/gst-chapter.html",
						controller: "chapterCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gst.dashboard", {
		url: "/dashboard",
		views: {
			"gst-side_menus" : {
						templateUrl:"templates/gst-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gst.faqs", {
		url: "/faqs",
		views: {
			"gst-side_menus" : {
						templateUrl:"templates/gst-faqs.html",
						controller: "faqsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gst.gst_rules", {
		url: "/gst_rules",
		views: {
			"gst-side_menus" : {
						templateUrl:"templates/gst-gst_rules.html",
						controller: "gst_rulesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gst.hsn_code", {
		url: "/hsn_code",
		views: {
			"gst-side_menus" : {
						templateUrl:"templates/gst-hsn_code.html",
						controller: "hsn_codeCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gst.sac_code", {
		url: "/sac_code",
		views: {
			"gst-side_menus" : {
						templateUrl:"templates/gst-sac_code.html",
						controller: "sac_codeCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gst.section_bookmark", {
		url: "/section_bookmark",
		cache:false,
		views: {
			"gst-side_menus" : {
						templateUrl:"templates/gst-section_bookmark.html",
						controller: "section_bookmarkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gst.section_singles", {
		url: "/section_singles/:id",
		cache:false,
		views: {
			"gst-side_menus" : {
						templateUrl:"templates/gst-section_singles.html",
						controller: "section_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gst.sections", {
		url: "/sections",
		cache:false,
		views: {
			"gst-side_menus" : {
						templateUrl:"templates/gst-sections.html",
						controller: "sectionsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("gst.slide_tab_menu", {
		url: "/slide_tab_menu",
		views: {
			"gst-side_menus" : {
						templateUrl:"templates/gst-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/gst/dashboard");
});
