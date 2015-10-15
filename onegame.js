/**
 * [OneGame 一心二用小游戏]
 * @author 	戈志刚
 * @param 	{[type]} Object
 */
!(function($) {
	function OneGame(options, ele) {
		this.$ele = $(ele);
		this.init(options);
	}

	OneGame.DEFAULT = {
		title: '休闲小游戏(一心两用)',
		width: 400,
		height: 556,
		style : {
			btn  : null,
			left : null,
			right: null,
			line : null,
			road : null,
			spirit:null,
			car  : null
		},
		roads : 4,
		roadColor:['#eaeaea','#d8d8d8'],
		spirits:[
		'data:image/gif;base64,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',
		'data:image/gif;base64,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'
		],
		offsetLeft    	: ['12.5%','37.5%','62.5%','87.5%'],
		currRoadIndex1  : 0,
		currRoadIndex2	: 2,
		speed: 20,
		para: 0.6,
		gameTimer: null,
		initScore: 0
	};

	OneGame.prototype = {
		init: function(options) {
			this.option 	= $.extend(OneGame.DEFAULT, options);
			this.$ele.append(this.getDom());
			this.width 		= this.$ele.width();
			this.height 	= this.$ele.height();
			this.$spirits 	= [];
			this.$stones    = [];
			this.$score   	= null;
			this.$btn     	= null;
			this.stoneHeight= 0;
			this.ogham 		= [0,-50,-100,-50];
			this.$roads 	= this.$ele.find('.roads').find('>div');
			this.addRoad();
		},
		addRoad : function(){
			var that  = this,
				winth = that.width,
				roadWidth = winth / that.$roads.length,
				color = that.option.roadColor;

			that.$roads.each(function(index, el) {
				var o = $('<div style="'+that.getStyle('spirit')+'" id="stone'+(index+1)+'"></div>')
						.appendTo(
							$(el).css({
								'width'  	: roadWidth+'px',
								'height'	: '100%',
								'background': color[index % 2]
							})
						);
				if(!index)that.stoneHeight = o.height();
				that.$stones.push(o);
			});

			that.$score = $('<div style="'+that.getStyle('score')+'">0</div>').appendTo(that.$ele);
			this.$btn   = $('<div style="' + that.getStyle('btn') + '">开 始</div>').appendTo(that.$ele);
			that.addSpirit();
		},
		addSpirit : function(){
			var that 	= this,
				roadLen = that.$roads.length,
				carLen  = roadLen % 2 == 0 ? (roadLen / 2) : 2;
			for(var i = 0; i < carLen;i++){
				var st = $('<div id="spirit'+(i+1)+'" style="'+that.getStyle('car')+';background-image:url('+that.option.spirits[i]+')"></div>')
						 .css('left',that.option.offsetLeft[i*2])
						 .appendTo(that.$ele);
				that.$spirits.push(st);
			}
			that.fall();
			that.addEvent();
		},
		//落石
		fall: function() {
			var rnd 	= -1 * Math.ceil(Math.random() * 30),
				that    = this,
				roadLen = that.$roads.length,
				opt     = that.option;
			for(var i = 0;i < roadLen;i++){
				if(that.ogham[i] > 100){
					that.ogham[i] = rnd;
				}else{
					that.ogham[i] = that.ogham[i] + that.option.para;
				}
				that.$stones[i].css('top', that.ogham[i] + '%');
			}

			var car1Top = that.$spirits[0].position().top,
				car2Top = that.$spirits[1].position().top,
				stone1Top = that.$stones[opt.currRoadIndex1].position().top + that.stoneHeight,
				stone2Top = that.$stones[opt.currRoadIndex2].position().top + that.stoneHeight,
				Distance1 = car1Top - stone1Top,
				Distance2 = car2Top - stone2Top;

			if ((Distance1 < 0 && Distance1 > (-that.stoneHeight * 2)) || (Distance2 < 0 && Distance2 > (-that.stoneHeight * 2))) {
				that.over();
			}
			this.$score.text(opt.initScore++);
		},
		//添加事件
		addEvent: function() {
			var that = this,
				opt  = that.option;

			that.$btn.off().on('click',function(){
				$(this).hide();
				opt.gameTimer = setInterval(function(){
					that.fall.call(that);
				}, opt.speed);
				$('.sideLine').css('-webkit-animation', 'line-move 0.1s linear infinite');
				that.addEvent();
			});


			that.$roads.off().on('click',function(){
				var index = that.$roads.index($(this));
				if (index < 2){
					that.$spirits[0].css('left',that.option.offsetLeft[index]);
					opt.currRoadIndex1 = index;
				}else{
					that.$spirits[1].css('left',that.option.offsetLeft[index]);
					opt.currRoadIndex2 = index;
				}
			});
		},
		//重置游戏
		reset: function() {
			var that = this,
				opt = that.option;
			clearInterval(opt.gameTimer);
			that.ogham = [0,-50,-100,-50];
			opt.initScore = 0;
			for(var i = 0; i < that.$spirits.length;i++){
				that.$spirits[i].css('left',that.option.offsetLeft[i*2]);
			}
			$('.sideLine').css('-webkit-animation', '0');
			that.$btn.show().text("重新开始");
		},
		//游戏结束
		over: function() {
			this.$roads.off();
			this.reset();
		},
		//拼装车道
		getDom: function() {
			var html = [],
				that = this,
				game = this.option;
			this.$ele.css({
				'position'	: 'relative',
				'margin'    : '0 auto',
				'width'		: game.width+'px',
				'height'	: game.height+'px'
			});
			html.push('<div style="' + that.getStyle('line') + '"></div>');
			html.push('<div class="sideLine" style="' + that.getStyle('left') + '"></div>');
			html.push('<div class="sideLine" style="' + that.getStyle('right') + '"></div>');
			html.push('<div class="roads" style="width:100%;height:100%;">');
			for(var i = 0,len = game.roads;i < len;i++){
				html.push('<div style="' + that.getStyle('road') + '"></div>');
			}
			html.push('</div>');
			return html.join('');
		},
		//获取样式
		getStyle: function(type) {
			var game  = this.option,
				style = {};
			style[type] = game.style[type] || (function(o){
				switch(o){
					case 'btn':
					  	return {
								'position'		: 'absolute',
								'top'			: '40%',
								'left'			: '50%',
								'width'			: '200px',
								'height'		: '60px',
								'line-height'	: '60px',
								'margin-left'	: '-100px',
								'background'	: '#f60',
								'z-index'		: 99,
								'font-size'		: '28px',
								'color'			: '#fff',
								'text-align'	: 'center',
								'border-radius'	: '5px',
								'cursor'		: 'pointer'
							};
					  	break;
					case 'line':
						return {
							'position'	: 'absolute',
							'top'		: 0,
							'left'		: '50%',
							'width'		: '4px',
							'height'	: '100%',
							'margin-left': '-2px',
							'background': 'yellow',
							'z-index'	: 98
						};
						break;
					case 'left':
						return {
							'position'	: 'absolute',
							'top'		: 0,
							'left'		: 0,
							'width'		: '3px',
							'height'	: '100%',
							'z-index'	: 98,
  							'border-left': '3px dashed yellow'
						};
						break;
					case 'right':
						return {
							'position'	: 'absolute',
							'top'		: 0,
							'right'		: 0,
							'width'		: '3px',
							'height'	: '100%',
							'z-index'	: 98,
  							'border-right': '3px dashed yellow'
						};
						break;
					case 'road':
						return {
							'float'		: 'left',
							'color'		: '#fff',
							'position'	: 'relative',
							'cursor'	: 'pointer'
						};
						break;
					case 'spirit':
						return {
							'position'		: 'absolute',
							'top'			: '0',
							'left'			: '50%',
							'margin-left'	: '-20px',
							'width'			: '40px',
							'height'		: '40px',
							'background-image': 'url(data:image/gif;base64,R0lGODlhKAAmANUkACYmJiIiIiMjIyQkJCUlJScnJyEhISAgIB8fHygoKCkpKR4eHh0dHSoqKhwcHC4uLisrKzo6Ojs7OywsLDMzMzk5OTU1NTc3Ny0tLTQ0NBsbGzExMTY2Njg4OBgYGDIyMhkZGTAwMBoaGi8vL////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyRTc0MkZGREY4NzExMUU0QjNGREE5MkZBOEM0M0ZERSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyRTc0MkZGRUY4NzExMUU0QjNGREE5MkZBOEM0M0ZERSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJFNzQyRkZCRjg3MTExRTRCM0ZEQTkyRkE4QzQzRkRFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJFNzQyRkZDRjg3MTExRTRCM0ZEQTkyRkE4QzQzRkRFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAJAAsAAAAACgAJgBABv9AknBILA4lxqTSGDgcBgEAoCAlSAdTgDUxEBQUhs3SOqVqAQIGtkoGDAyGQNcJDQgWSCLFoHAbBlBTCU5mUlprC01RAgEGAgcLjAEIEUIIjAdxWQmPZgIEBQMFAgh9hwgIA5lyBh4USyQZAQqFUgkBAVQKpBCVsHoHAQScWJMEUQVtBAJuno4IF0mlhmYEwwYIT7VVVQMJuwiJcqlFpKIACVRY1W2GUQABCQQLwQbLuKQOShEYjY6TBwQAkuTkACoEDDQYwPBLyQMEBhJciQIhQ8OGHBCAWnZOCygzaxQ0EGCgw0ULwRgIkJeqQChRA0B1CqAGkoEDE2Bd+qTFZYH/YBINcQMQR863N4+SPDgHyFqBQTe9kIkpJRmBOAc02BFAUoSYIRELTGoUzKkTZmjWJENQJhmut28PDIEQYOSjWQQAcTlnTagUVnbsoCIZR5WQRsxIsb0Vr50VngwOULGDReJbVQyFXHgAYJUdAmzRXV1gwI23ZDERyNGQikGCi0U+QMAwIkQF2LhJcKgqtECDPlwn+Mqthw/XoHlHCculIMHNB8QrOMACCso2v6EENOic51cDrH2DCpX5hJMjrghy/lKFjEo4KVxDkcml924jWBYCJHJz3AkXv1PcFE8yAKBiAHRJoCTeIQVcAtIaSC0DR0BipfFKERccQAsuQQ1y6AmAVQ2SSUAkIeZIEVlgAYY9aNST1xXtgFRPJHEwcJsQGk6xjEC2DKBBWWdU5ciCJBEmhwMWkQDBNar9UYVzGhUyinZOwGMNLkVlMgADFpAgQSnmDZCNE7hY0ZchKtKxiCOZSCKmAiREkIo3dlxnSDtTxHSVA3FwNYlqhpHQiChXGeBSMPCAWIYDCKRzlR1+wCUEKTf1aUsBpQEYUyKmtFFUYCDc2IADcnAVExapyNNIKqB0VgU2BzjggKkGRZMEBw2gIsUTx2xlBxweHQLIAR4c8AFuEkygmkBQQHIJJKQBMMEGGZikRBAAOw==)',
							'background-size' : '100%',
							'cursor'		: 'default'
						};
						break;
					case 'car' :
						return {
							'position'	: 'absolute',
							'bottom'	: 0,
							'margin-left': '-20px',
							'width'		: '40px',
							'height'	: '40px',
							'background-size': '100%'
						};
						break;
					case 'score':
						return {
							'position': 'absolute',
							'top': 0,
							'left': 0,
							'width': '100%',
							'height': '60px',
							'font-size': '46px',
							'text-align': 'center',
							'z-index': 98,
							'color': 'red'
						};
						break;
					default:
					    return '';
				}
			}(type));
			return this.objToString(style[type]);
		},
		objToString : function(style){
			var array = [];
			for(var key in style){
				array.push(key+':'+style[key]);
			}
			return array.join(';');
		}
	};


	var old = $.fn.mind;

	$.fn.mind = function(option) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data('bs.mind');
			$this.data('bs.mind', (data = new OneGame(option, this)));
		});
	};

	$.fn.mind.Constructor = OneGame;

	$.fn.mind.noConflict = function() {
		$.fn.mind = old;
		return this;
	};

})(jQuery);