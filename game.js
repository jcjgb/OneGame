OneGame = {};

OneGame.DEFAULT = {
	car1	: $("#car1"),
	car2	: $("#car2"),
	road	: $(".road"),
	block	: $(".block"),
	block1	: $("#block1"),
	block2	: $("#block2"),
	block3	: $("#block3"),
	block4	: $("#block4"),
	score	: $("#score"),
	blockHeight		: $(".block").height(),
	sideLine 		: $(".side-line"),
	currRoadIndex1  : 0,
	currRoadIndex2	: 2,
	speed			: 20,
	para			: 0.6,
	btnStart		: $("#btnStart"),
	gameTimer		: null,
	initScore		: 0,
	n1				: 0,
	n2				: -50,
	n3				: -100,
	n4				: -50
}

OneGame.fall = function(){
	var rnd = -1 * Math.ceil(Math.random() * 30),
		obj = OneGame.DEFAULT;
	if (obj.n1 > 100) { obj.n1 = rnd } else { obj.n1 = obj.n1 + obj.para }
	if (obj.n2 > 100) { obj.n2 = rnd } else { obj.n2 = obj.n2 + obj.para }
	if (obj.n3 > 100) { obj.n3 = rnd } else { obj.n3 = obj.n3 + obj.para }
	if (obj.n4 > 100) { obj.n4 = rnd } else { obj.n4 = obj.n4 + obj.para }

	obj.block1.css('top', obj.n1 + '%');
	obj.block2.css('top', obj.n2 + '%');
	obj.block3.css('top', obj.n3 + '%');
	obj.block4.css('top', obj.n4 + '%');
	var car1Top = obj.car1.position().top,
		car2Top = obj.car2.position().top,
		block1Top = obj.block.eq(obj.currRoadIndex1).position().top + obj.blockHeight,
		block2Top = obj.block.eq(obj.currRoadIndex2).position().top + obj.blockHeight,
		Distance1 = car1Top - block1Top,
		Distance2 = car2Top - block2Top;

	if ((Distance1 < 0 && Distance1 > (-obj.blockHeight * 2)) || (Distance2 < 0 && Distance2 > (-obj.blockHeight * 2))) {
		OneGame.over();
	}
	obj.initScore++;
	obj.score.text(obj.initScore);
}

OneGame.addEvent = function(){
	var obj  = OneGame.DEFAULT;
	//开始按钮事件
	obj.btnStart.on('click', function(event) {
		event.preventDefault();
		$(this).hide();
		obj.gameTimer = setInterval(OneGame.fall, obj.speed);
		obj.sideLine.css('-webkit-animation', 'line-move 0.1s linear infinite');
	});
	//点击跑道时间
	obj.road.on('click', function(event) {
		var index = obj.road.index($(this)); //赛道索引
		if (index < 2) {
			obj.car1.attr('class', 'pos' + index);
			obj.currRoadIndex1 = index;
		} else {
			obj.car2.attr('class', 'pos' + index);
			obj.currRoadIndex2 = index;
		}
	});
}
//游戏结束
OneGame.over = function(){
	var obj = OneGame.DEFAULT;
	obj.sideLine.css('-webkit-animation', '0');
	obj.road.unbind();
	clearInterval(obj.gameTimer);
	obj.btnStart.show().text("重新开始");
	obj.n1 = 0;
	obj.n2 = -50;
	obj.n3 = -100;
	obj.n4 = -50;
	obj.initScore = 0;
}

OneGame.addEvent();
OneGame.fall();