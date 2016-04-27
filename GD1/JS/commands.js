
$("#overlay .button").on('click', function(){
	var chapter = 0;  //Initialize
	var act = 0;      //Initialize
	RemoveOverlay();  //Get rid of dark overlay hiding game
	ShowChoices();    //Show the choices available to make
   if (chapter === 0 || chapter === null) { //Do this at the start of a new game
	   $(".story-screen p").text("Green arrives at safehouse in the middle of night. Smuggler drives into the night. Green surveys the safe house. Ordinary house abandoned months ago. Green arrives with no items except cash. Must go out to purchase food. Wearing light sweater and jeans. Some clothing and furniture was left behind but no food."); //Set the story
	   
	   $(".action[value='1']").text("Go Out and Purchase Groceries"); //Set option 1
	   $(".action[value='2']").text("Look for Items Left Behind");    //Set option 2
	   $(".action[value='3']").text("");                              //Set option 3
	   $(".action[value='3']").hide();                                //Hide this option 
   }
   localStorage.setItem('Chapter', JSON.stringify(chapter));          //Store the chapter in browser memory so it can be called by other functions
});

$(".action").on('click', function(){      // When an option (aka action) is chosen do the following..
	HideChoices();                        // Hide the previous options
	var chosen = $(this).attr("value");   // Take note of what option was chosen

	var chapter = JSON.parse(localStorage.getItem('Chapter')); //Determine what chapter we were on
	var act = JSON.parse(localStorage.getItem('Act'));         //Determine what act we were on
	
	if (chapter === 0){ 
		Chapter0(chosen, act); //Run the code for this chapter, using the chosen option
	}
	
	if (chapter === 1) {
		Chapter1(chosen,act); //Run the code for this chapter, using the chosen option
	}
});

function RemoveOverlay(){ //This makes the overlay appear when needed
	$(".message").fadeOut("200");
	$("#backdrop").fadeOut('500');
	$("#overlay").fadeOut("100");
}

function ShowChoices(delaytime){ //This makes the choices menu appear 
    if (delaytime === undefined) { //If no time given, do not delay
		var delaytime = 0;
	}
    $( ".choice-column" ).delay(delaytime).animate({ "right": "+=380px" }, 400 );
}

function HideChoices(){ //This makes the choices menu disappear
	$( ".choice-column" ).animate({ "right": "+=-380px" }, 800 );
}

$( document ).ready(function() {
});

function Chapter0(chosen,act) { //This is the code for the start of a new game
	if (chosen === "1"){
		// Fail - Caught
		$(".story-screen p").css("font-size","16px").text("ISIS fighters are tipped off regarding a man wearing western clothing and having the appearance of a foreigner... In the middle of the night, Local morality enforcement members appear come knocking on the door. Green is interrogated before being captured and turned over to ISIS fighters. He is accused of being a spy and executed on camera... Mission Failed.");
	   
	   HideChoices(); //Hide the choices (since none are available)
	}
	else if (chosen === "2"){
		// Success - move to Chapter 1 Act 1
		var act = 1; 
		Chapter1("0", act);
	}
}

function Chapter1(chosen, act) { //This is the code for Chapter 1
    localStorage.setItem("Chapter","1"); //Remember that we are on chapter 1 now
	
	if (act == "1"){
		$(".story-screen p").css("font-size","16px").text("Green finds some cosmetics and woman's black hair dye behind the mirror in the bathroom. A shaving brush, some toothpaste, and soap. Nothing useful in the kitchen or living room. One of the bedrooms contains men's pants and shirts. Green uses the dye to dye his beard and hair black to match the locals. Changes out of his jeans and t-shirt and into grey slacks with a linen shirt instead."); //Update story
		
		 $(".action[value='1']").text("Go Out and Purchase Groceries"); //Set option 1
	     $(".action[value='2']").hide();                                //Hide this option
	     $(".action[value='3']").hide();                                //Hide this option 
		 
		 ShowChoices(3000);
		 
		//set act to 2
		act = 2; 
		localStorage.setItem("Act", JSON.stringify(act)); //Store the act in memory
		return;
	}
    //-------------------
	if (act == 2){
		$(".story-screen p").css("font-size","16px").text("Green ventures out of the safe house to a nearby market. He passes by some armed ISIS fighters patrolling the streets. Luckily he does not stand out and is not harassed. However he does not want to push his luck so he quickly purchases food and groceries and immediately returns to the safehouse.");
		
		//set the act to 3
		act = 3;
		
		//Show continue button
		$(".ContinueBox p").delay(3000).fadeIn(6000); //Show the continue button after a delay
		$(".ContinueBox p").on('click',function(){ //Wait for continue to be clicked
			Chapter1(null, act); //Go to the next act (situation)
		});
	}
}
	
	function Chapter2(chosen, act) { //This is the code for Chapter 2
    localStorage.setItem("Chapter","2"); //Remember that we are on chapter 2 now
	}

/*
$( document ).ready(function() {
   
});
*/
