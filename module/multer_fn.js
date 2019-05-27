const multer = require('multer');
const fs = require('fs');
const allowImgExt = ['jpg', 'jpeg', 'gif', 'png'];
const allowFileExt = ['jpg', 'jpeg', 'gif', 'png', 'hwp', 'xls', 'xlsx', 'ppt', 'pptx', 'doc', 'docx', 'pdf', 'zip'];

const chkImgExt = (req, file, cb) => {
	var files = splitName(file.originalname);
	if(allowImgExt.indexOf(files.ext) > -1) cb(null, true);
	else cb(null, false);
}

const chkFileExt = (req, file, cb) => {
	var files = splitName(file.originalname);
	if(allowFileExt.indexOf(files.ext) > -1) cb(null, true);
	else cb(null, false);
}

const getDir = () => {
	var d = new Date();
	return String(d.getFullYear()).substr(2) + getMonth(d.getMonth());	//1905
};

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
	obj.oriName = obj.oriFile + '.' + obj.ext;
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
		var files = splitName(file.originalname);
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
	fs,
	getDir,
	getPath,
	chkImgExt,
	chkFileExt
}