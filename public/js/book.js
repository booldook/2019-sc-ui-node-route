function loc(page) {
	location.href = "/page?page="+page;
}

$("#book-list td:last-child").each(function(){
	$(this).text(vComma($(this).text()) + "원");
});