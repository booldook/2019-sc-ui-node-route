const multer = require('multer');		// multer 가져오기
const fs = require('fs');						// FileSystem 가져오기
// 업로드가 허락된 이미지 확장자
const allowImgExt = ['jpg', 'jpeg', 'gif', 'png'];
// 업로드가 허락된 파일 확장자
const allowFileExt = ['jpg', 'jpeg', 'gif', 'png', 'hwp', 'xls', 'xlsx', 'ppt', 'pptx', 'doc', 'docx', 'pdf', 'zip'];

// 파일의 확장자를 체크해서 업로드 여부 결정
const chkImgExt = (req, file, cb) => {
	if(allowImgExt.indexOf(splitName(file.originalname).ext) > -1) cb(null, true);
	else cb(null, false);
}
const chkFileExt = (req, file, cb) => {
	if(allowFileExt.indexOf(splitName(file.originalname).ext) > -1) cb(null, true);
	else cb(null, false);
}

// 월별 폴더 생성
const getDir = () => {
	var d = new Date();
	return String(d.getFullYear()).substr(2) + getMonth(d.getMonth());	//1905
};

// 실제 서버상 저장될 폴더
const getPath = (dir) => {
	var path = "./public/uploads/"+dir+"/";
	if(!fs.existsSync(path)) {
		fs.mkdir(path, (err) => {
			if(err) res.status(500).send("Internal Server Error");
		});
	}
	return path;
};

const splitName = (name) => {
	var obj = {};
	var arr = name.split('.');
	obj.time = new Date().getTime();
	obj.ext = arr.pop();
	obj.oriFile = arr.join('.');
	obj.oriName = name;
	obj.newFile = obj.time + '_' + Math.floor(Math.random() * 90 + 10);
	obj.newName = obj.newFile + '.' + obj.ext;
	return obj;
}

const getMonth = (month) => {
	if(month + 1 < 10) return "0"+(month+1);
	else return month + 1;
};

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, getPath(getDir()));
	},
	filename: (req, file, cb) => {
		var files = splitName(file.originalname);
		cb(null, getDir()+"_"+files.newName);
	}
});

module.exports = {
	multer,
	storage,
	chkImgExt,
	chkFileExt
}