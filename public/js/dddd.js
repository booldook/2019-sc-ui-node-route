$(document).ready(function()  {
	
	var holidays = {
		"0101":{type:0, title:"", year:"2019"},"0301":{type:0, title:"", year:"2019"},"0505":{type:0, title:"", year:"2019"},"0606":{type:0, title:"", year:"2019"},"0815":{type:0, title:"", year:"2019"},"1003":{type:0, title:"", year:"2019"},"1009":{type:0, title:"", year:"2019"},"1225":{type:0, title:"", year:"2019"},"0101":{type:0, title:"", year:"2020"},"1231":{type:0, title:"", year:"1969"},"1231":{type:0, title:"", year:"1969"}	};
	
	$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)','7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional['ko']);
	
	$('#sday').datepicker({
		
		showOn: 'focus',
		buttonText: "달력",
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		minDate: "+d",
		maxDate: '+31d',
		yearRange: 'c-99:c+99',
		beforeShowDay: function(day) {
			
			var result;
			var holiday = holidays[$.datepicker.formatDate("mmdd",day )];
			var thisYear = $.datepicker.formatDate("yy", day);
		
			// exist holiday?
			if (holiday) {
				
				if(thisYear == holiday.year || holiday.year == "") {
					
					result =  [false, "date-holiday", holiday.title];
				}
			}
	
			if(!result) {
				
				switch (day.getDay()) {
					
					case 0: // is sunday?
					result = [false, "date-sunday"];
					break;
					/*
					case 1: // is saturday?
					result = [false, "date-monday"];
					break;
					*/
					default:
					result = [true, ""];
					break;
				}
			}
			return result;
		}
	});
	
	$('#eday').datepicker({
		
		showOn: 'focus',
		buttonText: "달력",
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		/*minDate: "+0d",*/
		maxDate: '+90d',
		yearRange: 'c-99:c+99'
	});
	
	$('#wday').datepicker({
		
		showOn: 'focus',
		buttonText: "달력",
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		maxDate: '+0d',
		yearRange: 'c-99:c+99'
	});
});


function chg_date(tar) {
	
	$("#"+tar+"_in").val($("#"+tar).val());
}