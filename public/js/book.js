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
	var id = $(this).prev().prev().text();
	$.ajax({
		type: "get",
		url: "/detail/"+id,
		dataType: "json",
		success: function (res) {
			console.log(res);
			var src = "/img/noimage.gif";
			if(res.img != '' && res.img != null) {
				src = "/uploads/"+res.img.substr(0, 4)+"/" + res.img;
			}
			$(".dal-img").attr("src", src);
			$(".dal-tit").html(res.title);
			$(".dal-author").html(res.author);
			$(".dal-isbn").html(res.isbn);
			$(".dal-price").html(vComma(res.price)+"원");
			$(".dal-summary").html(res.summary);
			$("#bt-cart").attr("data-id", id);
			$("#bt-remove").attr("data-id", id);
			$("#bt-update").attr("data-id", id);
			$(".dal-bg").css("display", "flex");
		}
	});
}

$("#bt-remove").click(bookRev);
function bookRev() {
	if(confirm("진심 삭제?")) {
		var id = $(this).data("id");
		location.href = "/remove/"+id;
	}
}

$("#bt-update").click(bookChg);
function bookChg() {
	var id = $(this).data("id");
	location.href = "/update/"+id;
}
//$("#bt-cart").click();