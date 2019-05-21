/* Create, Insert */
INSERT INTO book 
(title, author, price, isbn, sdate, wdate, cnt, sellcnt, img, summary) 
values 
('홍길동전', '허균', 18000, '09-2345-3456', '1650-12-01', '2019-05-17 11:18:05', 
10, 0, '/upload/cover/1905/hong.jpg', 
'아버지를 아버지라 부르지 못하고 형을 형이라 부르지 못하고');

INSERT INTO book SET 
title 	= '홍길동전',
author 	= '허균',
price 	= 18000,
isbn 		= '09-2345-3456',
sdate 	= '1650-12-01',
wdate 	= '2019-05-17 11:18:05',
cnt 		= 10,
sellcnt = 0,
img 		= '/upload/cover/1905/hong.jpg',
summary = '아버지를 아버지라 부르지 못하고 형을 형이라 부르지 못하고';

/* Update, update */
/* UPDATE 와 DELETE 는 꼭!!! 반드시!!! WHERE 가 존재해야한다. */
UPDATE book SET cnt = 9, sellcnt = 1 WHERE id = 1;
UPDATE book SET title = '춘향전', author='변사또', summary='이 몽룡 철천지 원수!!!' 
WHERE id = 6;

/* Delete, delete */
DELETE FROM book WHERE id = 5;

/* Read, select */
SELECT * FROM book;
SELECT * FROM book ORDER BY id ASC;			--오름차순 정렬
SELECT * FROM book ORDER BY id DESC;		--내림차순 정렬
SELECT * FROM book ORDER BY title ASC;	--오름차순 정렬
SELECT id, title, author FROM book ORDER BY title ASC;

SELECT * FROM book WHERE id = 5;
SELECT * FROM book WHERE id >= 5 ORDER BY id ASC;

SELECT * FROM book WHERE title = '홍길동전';
SELECT * FROM book WHERE title LIKE '%홍%' ORDER BY id ASC;
SELECT * FROM book WHERE title LIKE '홍%';
SELECT * FROM book WHERE title LIKE '%홍';
SELECT * FROM book WHERE title LIKE '%홍%' OR author LIKE '%허%';
SELECT * FROM book WHERE title LIKE '%홍%' AND author LIKE '%허%' ORDER BY author ASC;

/* LIMIT 처음데이터, 가져올 레코드 수 */
SELECT * FROM book WHERE wdate > '1600-01-01' ORDER BY wdate ASC LIMIT 0, 10;
SELECT * FROM book WHERE wdate > '1600-01-01' ORDER BY wdate ASC LIMIT 10, 10;



INSERT INTO SET title='별주부전', author='거북이', price='20000', isbn='12-3456-7890', sdate='2019-05-21', wdate='2019-05-21 09:11:11', cnt=0, sellcnt=0, summary='거북이가 용왕을...', img=''