const multer = require('multer');
const fs = require('fs');

const getDir = () => {
	var d = new Date();
	return d.getFullYear().toString().substr(2) + getMonth(d.getMonth());	//1905
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

const getMonth = (month) => {
	if(month + 1 < 10) return "0"+(month+1);
	else return month + 1;
};

const storage = multer.diskStorage({
	destination: (req, res, cb) => {
		cb(null, getPath(getDir()));
	},
	filename: (req, file, cb) => {
		cb(null, getDir+"_"+Date.now()+"_"+file.originalname);
	}
});

module.exports = {
	multer,
	storage,
	fs,
	getDir,
	getPath
}