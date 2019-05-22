var fn = (str) => {
	console.log(str);
};

var fn2 = (str) => {
	console.log(str + " <= 전송받은 문자열");
};

module.exports = {
	fn,
	fn2
};