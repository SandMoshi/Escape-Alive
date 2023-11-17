<script>
function(){
	alert("loaded");
}
$(".button").on(click, function(){
	alert("hello");
	RemoveOverlay();
});

$(".story-screen p").text("Green arrives at safehouse in the middle of night. Smuggler drives into the night. Green surveys the safe house. Ordinary house abandoned months ago. Green arrives with no items except cash. Must go out to purchase food. Wearing light sweater and jeans. Some clothing left behind and furniture but no food.");

function RemoveOverlay(){
	$(".message").toggle("slow");
}

</script>