
$("#overlay .button").on('click', function(){
	var chapter = 0;  //Initialize
	var act = 0;      //Initialize
	RemoveOverlay();  //Get rid of dark overlay hiding game
	ShowChoices();    //Show the choices available to make
   if (chapter === 0 || chapter === null) { //Do this at the start of a new game
	  ChangeStory("Green arrives at safehouse in the middle of night. Smuggler drives into the night. Green surveys the safe house. Ordinary house abandoned months ago. Green arrives with no items except cash. Must go out to purchase food. Wearing light sweater and jeans. Some clothing and furniture was left behind but no food."); //Set the story
	   
	   $(".action[value='1']").text("Go Out and Purchase Groceries"); //Set option 1
	   $(".action[value='2']").text("Look for Items Left Behind");    //Set option 2
	   $(".action[value='3']").text("");                              //Set option 3
	   $(".action[value='3']").hide();                                //Hide this option 
   }
   localStorage.setItem('Chapter', JSON.stringify(chapter));          //Store the chapter in browser memory so it can be called by other functions
});

function ChangeStory(str,fontsize){ //Takes the string and updates the story box and adds typewriter effect
	$(".story-screen p").css("font-size", fontsize).text(str);
	Typewriter();
}

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
	if (chapter === 2){ 
		Chapter2(chosen, act); //Run the code for this chapter, using the chosen option
	}
	
	if (chapter === 3) {
		Chapter3(chosen,act); //Run the code for this chapter, using the chosen option
	}
});

function RemoveOverlay(){ //This makes the overlay appear when needed
	$(".message").fadeOut(200);
	$("#backdrop").fadeOut(500);
	$("#overlay").fadeOut(100);
	$("#grid").fadeIn(200);
}

function TransitionChapter(){
	$(".message:visible").fadeOut(1);
	$("#overlay:hidden").fadeIn(1);
	$("#backdrop:hidden").fadeIn(2000, function(){
		var chapter = localStorage.getItem("Chapter");
		$("#msg_backdrop").text("Chapter " + chapter);		
		$("#msg_backdrop").css("visibility","visible").delay(1000).fadeOut(1000, function(){
			$("#backdrop").fadeOut(3000);
			$("#overlay:visible").delay(2000).fadeOut(1000);
		});
	});
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

function FlashRed(){ //This makes the background flash red
    console.log("About to flash red colours");
	$("#game_window").addClass("Red");
	$("div").promise().done(function() {
		$("#game_window").removeClass("Red");
	});
	
	// $("#game_window").delay(300).removeClass("Red");
	// $("#game_window").addClass("Red");
	
	// $("#game_window").animate({
		// backgroundColor: "#FF0000"}, 1000, function(){
			// $("#game_window").animate({
		      // backgroundColor: "white"},1000);
	    // });
}

function Typewriter(){
	
  //Initialize all variable that will be used
  var str = $('.story-screen p').html(), 
  i = 0,
  isTag,
  text,
  timer;       
	$(".action" || ".continue").on("click", function(){
		clearTimeout(timer);
	});
	(function type() {
	   text = str.slice(0, ++i);
	   if (text === str) return;
	   $('.story-screen p').html(text);
	   var char = text.slice(-1);
	   if (char === '<') isTag = true;
	   if (char === '>') isTag = false;
	   if (isTag) return type();
	   timer = setTimeout(type, 52);
	}());
	$(".showAllText").on("click", function(){
		clearTimeout(timer);
		$(".story-screen p").html(str);
	});	
}


//---------- BACKGROUND ---- CHAPTER 0 -----------------
function Chapter0(chosen,act) { //This is the code for the start of a new game
    
	if (chosen === "1"){
		// Fail - Caught
		FlashRed();
		ChangeStory("ISIS fighters are tipped off regarding a man wearing western clothing and having the appearance of a foreigner... In the middle of the night, Local morality enforcement members appear come knocking on the door. Green is interrogated before being captured and turned over to ISIS fighters. He is accused of being a spy and executed on camera... Mission Failed.","16px");
	   
	    HideChoices(); //Hide the choices (since none are available)
	}
	else if (chosen === "2"){
		// Success - move to Chapter 1 Act 1
		var act = 1; 
		Chapter1("0", act);
	}
}
//----------- CHAPTER 1 --------------------------------
function Chapter1(chosen, act) { //This is the code for Chapter 1
    localStorage.setItem("Chapter","1"); //Remember that we are on chapter 1 now
	
	$("#level").text("Chapter 1"); //Change the title (level)
	
	if (act == "1"){
		ChangeStory("Green finds some cosmetics and woman's black hair dye behind the mirror in the bathroom. A shaving brush, some toothpaste, and soap. Nothing useful in the kitchen or living room. One of the bedrooms contains men's pants and shirts. Green uses the dye to dye his beard and hair black to match the locals. Changes out of his jeans and t-shirt and into grey slacks with a linen shirt instead.","16px"); //Update story
		
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
		ChangeStory("Green ventures out of the safe house to a nearby market. He passes by some armed ISIS fighters patrolling the streets. Luckily he does not stand out and is not harassed. However he does not want to push his luck so he quickly purchases food and groceries and immediately returns to the safehouse.","16px");
		
		//Show continue button
		$(".ContinueBox p").delay(3000).fadeIn(4000); //Show the continue button after a delay
		$(".ContinueBox p").on('click',function(){ //Wait for continue to be 
			$(".ContinueBox p").fadeOut(200); //Show the continue button after a delay
			Chapter2(null, 0); //Go to the next act (situation)
		});
	}
}

//--------- CHAPTER 2 ------------------------------------------
function Chapter2(chosen, act) { //This is the code for Chapter 2
	
	$("#level").text("Chapter 2"); //Change the title (level)
	
	if (act === 0){
		localStorage.setItem("Chapter","2"); //Remember that we are on chapter 2 now
        localStorage.setItem("Act",1);       //Remember we are on act 1 next		
		
		TransitionChapter(Chapter2(0,1));   //Screen goes black, displays new chapter, fades back to game
		};
		
	    //-------------------
	if (act == 1){
		console.log("Chp2a1 started.")
		ChangeStory("GREEN was told BLUE, a local cooperating with the CIA, would reach out to GREEN. GREEN is told to keep a low profile until contact is made.","16px");
		
		
	    $(".action[value='1']").text("Wait several days until contact is made"); //Set option 1
	    $(".action[value='2']").text("Begin exploring the city and gather information");    //Set option 2
	    $(".action[value='2']").show();                                //Hide this option 
	    $(".action[value='3']").text("");                              //Set option 3
	    $(".action[value='3']").hide();                                //Hide this option 
	   
		ShowChoices();
	   
		//set the act to 2 (will go to act 2 if an option is chosen)
		act = 2;
		localStorage.setItem("Act", JSON.stringify(act)); //Store the act in memory
		
		return;
	}
		//-------------------
	if (act == 2){
		if (chosen === "1"){
		   HideChoices(); //Hide the choices (since none are available)
		   
		   var act = 3;
		   Chapter2("0",act); //Go to act 3
		}
		else if (chosen === "2"){
			ChangeStory("You begin to explore the city and get your bearings and become familiar with all the intersections in the neighbourhood.","16px");
			
		    //Show continue button
			$(".ContinueBox p").delay(2000).fadeIn(2000); //Show the continue button after a delay
			$(".ContinueBox p").on('click',function(){ //Wait for continue to be clicked
				$(".ContinueBox p").fadeOut(100); //Show the continue button after a delay
				// Success - move to Chapter 2 Act 3
				var act = 3; 
				Chapter2("0", act); //Go to act 3
			});
		}
	}

    if (act == 3){
		ChangeStory("After 7 days, BLUE has yet to make contact. GREEN becomes paranoid that BLUE has been captured and is being tortured to give information on his contacts.","16px");
		
		$(".action[value='1']").text("Continue to wait for BLUE to show up"); //Set option 1
	    $(".action[value='2']").text("Begin searching for a new safehouse");    //Set option 2
	    $(".action[value='2']").show();                                //Show this option 
	    $(".action[value='3']").text("Gather information on your own in the meantime");                              //Set option 3
	    $(".action[value='3']").show();                                //Show this option 
	   
	    //set the act to 4 (will go to act 4 if an option is chosen)
		act = 4;
		localStorage.setItem("Act", JSON.stringify(act)); //Store the act in memory
	    
		ShowChoices();
		return;
	}	
	if (act === 4){
		if (chosen === "1"){
			ChangeStory("Day 10: ISIS fighters break down the door and storm your safehouse. You are captured. During torture an ISIS member describes how you will meet the same fate as BLUE who was captured a week earlier. After two weeks of torture you are executed in the middle of the city square and the video is posted online. The government denies sending any spies to the region. MISSION FAILED!","16px");
			
			HideChoices(); //Hide the choices (since none are available)
		}
		if (chosen === "2"){
			ChangeStory("You know there is resistance to ISIS amongst the former professionals, doctors, and businessmen in the city so you proceed to the former upscale market district where socialites and professionals continue to gather. While drinking tea at a cafe you meet a former professor from the local university. You tell him you ran a barbershop in town until the morality police shut it down and your family has since escaped the country... He offers you a rental room in his house.","14px");
			
			//Show continue button
			$(".ContinueBox p").fadeIn(2000); //Show the continue button after a delay
			$(".ContinueBox p").on('click',function(){ //Wait for continue to be clicked
			$(".ContinueBox p").fadeOut(1000); //Show the continue button after a delay
				// Success - move to Chapter 3 Act 1
				var act = 1; 
				localStorage.setItem("Act", JSON.stringify(act)); //Store the act in memory
				Chapter3("0", act); 
			});
		}
		if (chosen === "3"){
			ChangeStory("Day 10: You are returning to the safehouse after a day of surveilance when you hear yelling and a large commotion in the neighbhourhood. As you round the corner you see several pickup trucks of ISIS fighters funneling into your safe house. You narrowly avoid capture, quickly turning the corner before anyone spots you.","16px");
			
            $(".action[value='1']").text("Find a New Safehouse"); //Set option 1
			$(".action[value='2']").text(""); //Set option 2
			$(".action[value='3']").text(""); //Set option 3
			
			$(".action[value='2']").hide();  
			$(".action[value='3']").hide(); 
			
			//set the act to 5 (will go to act 5 if an option is chosen)
			act = 5;
			localStorage.setItem("Act", JSON.stringify(act)); //Store the act in memory
	    
			ShowChoices();
			return;
		}
	}
	if (act === 5){
		//Outcome is the same as if act 4 choice 2 so redirect to there
		Chapter2("2",4);
	}
}

//--------- CHAPTER 3 ------------------------------------------
function Chapter3(chosen, act) { //This is the code for Chapter 3

	$("#level").text("Chapter 3"); //Change the title (level)
	
	if (act === 0){
		localStorage.setItem("Chapter","3"); //Remember that we are on chapter 2 now
        localStorage.setItem("Act","0");       //Remember we are on act 1 next		
		
		TransitionChapter(); //Screen goes black, displays new chapter, fades back to game
		
        Chapter3(null,1);
	}

}
//-------- "SKIP" FEATURE ---------------------
$('button[name = "goToBtn"]').on('click', function(){
	
	var chp = $('input[name="chapter"]').val();
	var act = $('input[name="Act"]').val();
	console.log("Skipped to Chapter " + chp + " Act " + act);
	
	RemoveOverlay();  //Get rid of dark overlay hiding game
	
	if (chp == 0){
		console.log("...skipping... done.")
		Chapter0(null,act);
	}
	if (chp == 1){
		console.log("...skipping... done.")
		Chapter1(null,act);
	}
	if (chp == 2){
		console.log("...skipping... done.")
		Chapter2(null,act);
	}
	if (chp == 3){
		console.log("...skipping... done.")
		Chapter3(null,act);
	}
	if (chp == 4){
		console.log("...skipping... done.")
		Chapter4(null,act);
	}
});

$( document ).ready(function() {
   
});
