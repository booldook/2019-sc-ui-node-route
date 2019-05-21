$("#sdate").datepicker({
	showOn: 'focus',
	buttonText: "달력",
	changeMonth: true,
	changeYear: true,
	yearRange: 'c-200:c+0',
	showButtonPanel: true
});
$("#bt_save").click(function(){
	var $f = $(document.book_in);
	var title = $("input[name='title']", $f);
	var author = $("input[name='author']", $f);
	var price = $("input[name='price']", $f);
	var isbn = [];
	isbn.push($("input[name='isbn_0']", $f));
	isbn.push($("input[name='isbn_1']", $f));
	isbn.push($("input[name='isbn_2']", $f));
	var sdate = $("input[name='sdate']", $f);
	var cnt = $("input[name='cnt']", $f);
	var summary = $("textarea[name='summary']", $f);

	if(title.val() == "") {
		alert("책 제목을 입력하세요.");
		title.focus();
		return false;
	}
	if(author.val() == "") {
		alert("저자를 입력하세요.");
		author.focus();
		return false;
	}
	if(price.val() == "") {
		alert("판매금액을 입력하세요.");
		price.focus();
		return false;
	}
	if(isbn[0].val() == "" && isbn[0].length < 2) {
		alert("ISBN을 입력하세요. 두자리 입니다.");
		isbn[0].focus();
		return false;
	}
	if(isbn[1].val() == "" && isbn[0].length < 4) {
		alert("ISBN을 입력하세요. 네자리 입니다.");
		isbn[1].focus();
		return false;
	}
	if(isbn[2].val() == "" && isbn[0].length < 4) {
		alert("ISBN을 입력하세요. 네자리 입니다.");
		isbn[2].focus();
		return false;
	}
	if(sdate.val() == "") {
		alert("발행일을 입력하세요.");
		sdate.focus();
		return false;
	}
	if(summary.val() == "") {
		alert("요약정보를 입력하세요.");
		summary.focus();
		return false;
	}
	$f.submit();
});