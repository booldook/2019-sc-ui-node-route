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

module.exports = {
	zp,
	localDate
};