function loc(page) {
	location.href = "/page?page="+page;
}

$("#book-list td:last-child").each(function(){
	$(this).text(vComma($(this).text()) + "원");
});

var page = 1;
$.ajax({
	type: "get",
	url: "/book",
	data: {page: page},
	dataType: "json",
	success: function (res) {
		console.log(res);
		$(".jumbotron > h5").html(res.smTit);
		var html = '';
		for(var i in res.items) {
			html += '<tr>';
			html += '<td>'+res.items[i].id+'</td>';
			html += '<td>'+res.items[i].title+'</td>';
			html += '<td>'+res.items[i].author+'</td>';
			html += '<td>'+res.items[i].sdate+'</td>';
			html += '<td>'+vComma(res.items[i].price)+'원</td>';
			html += '</tr>';
		}
		$("#book-list > tbody").html(html);
	}
});