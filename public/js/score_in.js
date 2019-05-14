function send(f) {
	var uname = f.uname.value;
	var kor = f.kor.value;
	location.href = "/score_save?uname="+uname+"&kor="+kor;
}