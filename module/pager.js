const pageCnt = 3;		// 한페이지에 나타날 데이터 갯수
const pageDiv = 3;		// 페이저 한셋트당 보여질 페이지 갯수

const pagerCreate = (page, pageTotal) => {
	var pageGrp = Math.floor((page - 1)/pageDiv);	// pager의 group index
	var pageFirst = pageGrp * pageDiv + 1;	// pager group 의 시작 페이지 값
	var pageArr = [];	// PUG에 전달할 페이지 배열
	for(let i=pageFirst; i<pageFirst + pageDiv; i++) {
		if(i<=pageTotal) pageArr.push(i);
		else break;
	}
	// 이전페이지그룹 존재여부(pageLt) / 이전페이지 번호(pageLtNum)
	var pageLt = false;
	if(pageGrp > 0) pageLt = true;
	var pageLtNum = pageFirst - 1;
	// 다음페이지그룹 존재여부(pageRt) / 다음페이지 번호(pageRtNum)
	var lastGrp = Math.floor((pageTotal - 1)/pageDiv);
	var pageRt = false;
	if(lastGrp > pageGrp) pageRt = true;
	var pageRtNum = pageFirst + pageDiv;
	return {
		pageActive: page,
		pageLt,
		pageLtNum,
		pageRt,
		pageRtNum,
		pageArr
	};
};

module.exports = {
	pageCnt,
	pageDiv,
	pagerCreate
};