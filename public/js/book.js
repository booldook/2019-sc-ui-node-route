function loc(page) {
	location.href = "/page?page="+page;
}

$("#book-list td:last-child").each(function(){
	$(this).text(vComma($(this).text()) + "원");
});

$(".bt-close").click(function(){
	$(".dal-bg").hide();
});

$(".dal-bg").click(function(){
	$(this).hide();
});

$(".dals").click(function(e){
	e.stopPropagation();
});

$(".click-tit").click(modalOpen);
function modalOpen() {
	$(".dal-bg").css("display", "flex");
}