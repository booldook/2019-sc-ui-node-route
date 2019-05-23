const zp = (n) => {
	if(n < 10) return "0" + n;
	else return n;
};
const localDate = (val) => {
	var d = null;
	var dt = '';
	if(val === undefined) d = new Date();
	else if(typeof val == "number") d = new Date(val);
	else return 0;
	dt += d.getFullYear() + '-';
	dt += zp(d.getMonth() + 1) + '-';
	dt += zp(d.getDate()) + ' ';
	dt += zp(d.getHours()) + ':';
	dt += zp(d.getMinutes()) + ':';
	dt += zp(d.getSeconds());
	return dt;
};
// JS - 입력창에 숫자만 입력
function onlyNum(obj) {
	var rNum = '';
	for(i=0;i<obj.value.length;i++) {
		if(/[0-9]/g.test(obj.value.charAt(i))) rNum = rNum + obj.value.charAt(i);
		//else alert("숫자만 입력해주세요!");
	}
	obj.value = rNum;
}

// JS - 값을 전달하면 ,를 추가해서 리턴 - 천단위
const vComma = (val) => {
	var str = "" + String(val).replace(/,/gi,''); // 콤마 제거
	var regx = new RegExp(/(-?\d+)(\d{3})/); 
	var bExists = str.indexOf(".",0); 
	var strArr  = str.split('.');
	while(regx.test(strArr[0])){
		strArr[0] = strArr[0].replace(regx,"$1,$2"); 
	} 
	if (bExists > -1) val = strArr[0] + "." + strArr[1]; 
	else val = strArr[0];
	return val; 
}

// JS - 값을 전달하면 ,를 삭제 후 리턴 - 천단위
const vCommaDel = (val) => {
	var str = "" + String(val).replace(/,/gi,''); // 콤마 제거
	return Number(str);
}


module.exports = {
	zp,
	localDate,
	vComma,
	vCommaDel
};