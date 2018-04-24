$(document).ready(function() {

	var $menu;
	var menu_button;

    var mq = window.matchMedia('all and (max-width: 900px)');
    if(mq.matches) {
    	// Menú responsive
        $menu = $('.header-data');
		$menu_button = $('.menu-bars');
		
		$("#login-Modal").addClass("modal fade"); 
	    $(".login-block").show();

		// Login Modal
		$(".login-button").click(function(){
		    $("#login-Modal").modal();
		    close();	
		});

    } else {
    	// Menú de login
        $menu = $('.login-block');
		$menu_button = $('.login-button');
    }




	$(document).mouseup(function (e) {

		if (!$menu.is(e.target)
		&& $menu.has(e.target).length === 0
		&& !($($menu_button).is(e.target)))
		{
			close();
		}

	});

	$($menu_button).click(function () {
	  
	  	$($menu).slideToggle(300, function() {
	  		
	  		if($($menu).hasClass('open-menu')){
	  			$($menu).removeClass("open-menu");
	  		}
	  		else {
	  			$($menu).addClass("open-menu");  			
	  		}

		});
	});

	function close(){
		if($($menu).hasClass('open-menu')){
			$($menu).slideToggle(300, function() {
				$menu.hide(); 	
				$($menu).removeClass("open-menu");	
			});  
		}	
	}

});
