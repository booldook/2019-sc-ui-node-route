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
	var id = $(this).prev().text();
	$.ajax({
		type: "get",
		url: "/detail/"+id,
		dataType: "json",
		success: function (res) {
			console.log(res);
			$(".dal-tit").html(res.title);
			$(".dal-author").html(res.author);
			$(".dal-isbn").html(res.isbn);
			$(".dal-price").html(vComma(res.price)+"원");
			$(".dal-summary").html(res.summary);
			$(".dal-bg").css("display", "flex");
		}
	});
}