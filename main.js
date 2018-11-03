let mainTank = `img/tanks_svg/tank-yellow-1.svg`
let enemyTank = `img/tanks_svg/tank-green-1.svg`
let bulletSpeed = 15
let distance = 3
let tankSpeed = 35
let enemiesSpeed = 100
let tableWidth = null
let tableHeight = null
let endingRight = null
let endingBottom = null
let tdWidth = null
let tdHeight = null
let brickOffset = []
let enemiesArray = []

function tableInit(){
	let table = document.createElement('table')
	table.id = 'table'
	$('body').append(table)
	for(let i = 0 ; i<50;i++){
		let tr = document.createElement('tr')
		table.appendChild(tr)
		for(let j = 0 ; j<50;j++){
			let td = document.createElement('td')
			tr.appendChild(td)
		}
	}
	$('#table').css({
		'width' : '50%',
		'height' : '90vh'
	})
	$('#table').find('td').css({
		'width' : tdWidth
	})
	tableWidth = $('#table').width()
	tableHeight = $('#table').height()
	endingRight = $('#table').offset().left + tableWidth
	endingBottom = $('#table').offset().top + tableHeight
	tdWidth = tableWidth/50
	tdHeight = tableHeight/50	

}
class Obstacles{
	constructor(trStart,tdStart,trEnd,tdEnd,type){
		this._trStart = trStart
		this._tdStart = tdStart
		this._trEnd = trEnd
		this._tdEnd = tdEnd
		this._type = type
	}
	setObstacles(){
		for(let i = 0;i<50;i++){
			for(let j = 0;j<50;j++){
				if(i >= this._trStart && i <= this._trEnd){
					if(j >= this._tdStart && j < this._tdEnd){
						brickOffset.push([$('#table').find("tr").eq(i).find('td').eq(j).offset(),$('#table').find("tr").eq(i).find('td').eq(j)[0],this._type])
						$('#table').find("tr").eq(i).find('td').eq(j).addClass(this._type)
					}
				}
			}
		}
	}
}
function obstaclesTop(target,targetType){
	for(let i = 0 ;i<brickOffset.length;i++){
		if(targetType.toLowerCase() === 'bullet'){
			if(target.offset().left + tdWidth >= brickOffset[i][0]['left']){
				if(target.offset().left  <= brickOffset[i][0]['left'] + tdWidth){
					if(target.offset().top <= brickOffset[i][0]['top'] + tdHeight && target.offset().top - brickOffset[i][0]['top'] + tdHeight >=tdHeight){
						if($(brickOffset[i][1]).hasClass('brick')){
							$(brickOffset[i][1]).removeClass('brick')
							brickOffset.splice(i,1)
							return false	
						}
						if($(brickOffset[i][1]).hasClass('metal')){
							return false
						}
					}
				}
			}
		}
		else if(targetType.toLowerCase() === 'tank'){
			if(target.offset().left + tdWidth  >= brickOffset[i][0]['left'] - tdWidth){
				if(target.offset().left  <= brickOffset[i][0]['left'] + tdWidth){
					if(target.offset().top <= brickOffset[i][0]['top'] + tdHeight && target.offset().top - brickOffset[i][0]['top'] + tdHeight >=tdHeight){
						return false
					}
				}
			}
			
		}
	}
}
function obstaclesBottom(target,targetType){
	for(let i = 0;i<brickOffset.length;i++){
		if(targetType.toLowerCase() === 'bullet'){
			if(target.offset().left + tdWidth >= brickOffset[i][0]['left']){
				if(target.offset().left  <= brickOffset[i][0]['left'] + tdWidth){
					if(target.offset().top <= brickOffset[i][0]['top'] + tdHeight && target.offset().top - brickOffset[i][0]['top'] + tdHeight >=tdHeight){
						if($(brickOffset[i][1]).hasClass('brick')){
							$(brickOffset[i][1]).removeClass('brick')
							brickOffset.splice(i,1)
							return false	
						}
						if($(brickOffset[i][1]).hasClass('metal')){
							return false
						}
					}
				}
			}
		}
		else if(targetType.toLowerCase() === 'tank'){
			if(target.offset().left + tdWidth  >= brickOffset[i][0]['left'] - tdWidth ){
				if(target.offset().left  <= brickOffset[i][0]['left'] + tdWidth){
					if(target.offset().top + tableHeight*0.055 >= brickOffset[i][0]['top'] &&  brickOffset[i][0]['top']+ tdHeight - target.offset().top  >=tdHeight ){
						return false
					}
				}
			}
			
		}
	}
}
function obstaclesRight(target,targetType){	
	for(let i = 0;i<brickOffset.length;i++){
		if(targetType.toLowerCase() === 'bullet'){
			if(target.offset().left + tdWidth >= brickOffset[i][0]['left'] && target.offset().left - brickOffset[i][0]['left'] <= tdWidth){
				if(target.offset().top + tdHeight >= brickOffset[i][0]['top']){
					if(target.offset().top  <= brickOffset[i][0]['top'] + tdHeight){
						if($(brickOffset[i][1]).hasClass('brick')){
							$(brickOffset[i][1]).removeClass('brick')
							brickOffset.splice(i,1)
							return false	
						}
						if($(brickOffset[i][1]).hasClass('metal')){
							return false
						}
					}
				}
			}
		}
		else if(targetType.toLowerCase() === 'tank'){
			if(target.offset().top <= brickOffset[i][0]['top'] + tdHeight){
				if(target.offset().top + tableHeight*0.055 >= brickOffset[i][0]['top']){
					if(target.offset().left + tableWidth*0.055 >= brickOffset[i][0]['left']  &&  target.offset().left + tableWidth*0.055 - brickOffset[i][0]['left'] <=tdWidth){
						return false
					}
				}
			}
		}
	}
}
function obstaclesLeft(target,targetType){
	for(let i = 0;i<brickOffset.length;i++){
		if(targetType.toLowerCase() === 'bullet'){
			if(brickOffset[i][0]['left'] + tdWidth >= target.offset().left  &&brickOffset[i][0]['left'] - target.offset().left<= tdWidth){
				if(target.offset().top + tdHeight >= brickOffset[i][0]['top']){
					if(target.offset().top  <= brickOffset[i][0]['top'] + tdHeight){
						if($(brickOffset[i][1]).hasClass('brick')){
							$(brickOffset[i][1]).removeClass('brick')
							brickOffset.splice(i,1)
							return false	
						}
						if($(brickOffset[i][1]).hasClass('metal')){
							return false
						}
					}
				}
			}
		}
		else if(targetType.toLowerCase() === 'tank'){
			if(target.offset().top <= brickOffset[i][0]['top'] + tdHeight){
				if(target.offset().top + tableHeight*0.055 >= brickOffset[i][0]['top']){
					if(brickOffset[i][0]['left'] + tdWidth >= target.offset().left && brickOffset[i][0]['left'] + tdWidth - target.offset().left <=tdWidth){
						return false
					}
				}
			}
		}
	}	
}

function tanksCollisionTop(target,targetType){
	if(enemiesArray.length>0){
		for(let j=0;j<enemiesArray.length;j++){
			if(targetType === 'mainTank' || (targetType === 'enemy' && target !== enemiesArray[j])){
				if(target.offset().top - tableHeight*0.055 <= $(enemiesArray)[j].offset().top  && target.offset().top - tableHeight*0.055 - $(enemiesArray)[j].offset().top  <=tableHeight*0.055 && target.offset().top + tableHeight*0.055 - $(enemiesArray)[j].offset().top >= 0){
					if(target.offset().left - tableWidth*0.035 <= $(enemiesArray)[j].offset().left ){
						if(target.offset().left  >= $(enemiesArray)[j].offset().left - tableWidth*0.035){
							return false
						}
					}
				}
			}
			if(targetType === 'enemy'){
				if(target.offset().top - tableHeight*0.055 <= $("#tank").offset().top  && target.offset().top - tableHeight*0.055 - $("#tank").offset().top  <= tableHeight*0.055 && target.offset().top + tableHeight*0.055 - $("#tank").offset().top >= 0){
					if(target.offset().left - tableWidth*0.035 <= $("#tank").offset().left ){
						if(target.offset().left  >= $("#tank").offset().left - tableWidth*0.035){
							return false
						}
					}
				}	
			}
		}	
	}
}

function tanksCollisionBot(target,targetType){
	if(enemiesArray.length>0){
		for(let j=0;j<enemiesArray.length;j++){
			if(targetType === 'mainTank' || (targetType === 'enemy' && target !== enemiesArray[j])){
				if(target.offset().top + tableHeight*0.055 >= $(enemiesArray)[j].offset().top && target.offset().top + tableHeight*0.055 - $(enemiesArray)[j].offset().top >= 0){
					if(target.offset().left - tableWidth*0.035 <= $(enemiesArray)[j].offset().left ){
						if(target.offset().left  >= $(enemiesArray)[j].offset().left - tableWidth*0.035){
							return false
						}
					}
				}
			}
			if(targetType === 'enemy'){
				if(target.offset().top + tableHeight*0.055 >= $("#tank").offset().top && target.offset().top + tableHeight*0.055 - $("#tank").offset().top >= 0){
					if(target.offset().left - tableWidth*0.035 <= $("#tank").offset().left ){
						if(target.offset().left  >= $("#tank").offset().left - tableWidth*0.035){
							return false
						}
					}
				}	
			}
		}	
	}
}

function tanksCollisionLeft(target,targetType){
	if(enemiesArray.length>0){
		for(let j=0;j<enemiesArray.length;j++){
			if(targetType === 'mainTank' || (targetType === 'enemy' && target !== enemiesArray[j])){
				if($(enemiesArray)[j].offset().left + tableWidth*0.055 >= target.offset().left && $(enemiesArray)[j].offset().left + tableWidth*0.055 - target.offset().left<=tdWidth ){
					if(target.offset().top +  tableHeight*0.035 >= $(enemiesArray)[j].offset().top){
						if(target.offset().top  <= $(enemiesArray)[j].offset().top +  tableHeight*0.035){
							return false
						}
					}
				}
			}
			if(targetType === 'enemy'){
				if($("#tank").offset().left + tableWidth*0.055 >= target.offset().left && $("#tank").offset().left + tableWidth*0.055 - target.offset().left <=tdWidth){
					if(target.offset().top +  tableHeight*0.035 >= $("#tank").offset().top){
						if(target.offset().top  <= $("#tank").offset().top +  tableHeight*0.035){
							return false
						}
					}
				}	
			}
		}	
	}
}
function tanksCollisionRight(target,targetType){
	if(enemiesArray.length>0){
		for(let j=0;j<enemiesArray.length;j++){
			if(targetType === 'mainTank' || (targetType === 'enemy' && target !== enemiesArray[j])){
				if($(enemiesArray)[j].offset().left <= target.offset().left + tableWidth*0.055 && target.offset().left + tableWidth*0.055 - $(enemiesArray)[j].offset().left <=tdWidth){
					if(target.offset().top +  tableHeight*0.035 >= $(enemiesArray)[j].offset().top){
						if(target.offset().top  <= $(enemiesArray)[j].offset().top +  tableHeight*0.035){
							return false
						}
					}
				}
			}
			if(targetType === 'enemy'){
				if($("#tank").offset().left  <= target.offset().left + tableWidth*0.055 && target.offset().left + tableWidth*0.055 - $("#tank").offset().left  <=tdWidth){
					if(target.offset().top +  tableHeight*0.035 >= $("#tank").offset().top){
						if(target.offset().top  <= $("#tank").offset().top +  tableHeight*0.035){
							return false
						}
					}
				}	
			}
		}	
	}
}


class Bullet{
	constructor(rotation,positionTop,positionLeft,owner){
		this._rotation = rotation
		this._positionTop = positionTop
		this._positionLeft = positionLeft
		this._owner = owner
	}
	move(){
		Bullet.counter++
		let rotation = this._rotation
		let mainOwner = this._owner
		$('body').append(`<div id=bullet-${Bullet.counter} class='bullet'></div>`)
		let bullet = $(`#bullet-${Bullet.counter}`)
		//top
		let bulletInterval = setInterval(function(){
			if(rotation === 0){
				bullet.css({'top': '-=' + distance})
				if(bullet.offset().top <= $('#table').offset().top){
					bullet.remove()
					clearInterval(bulletInterval)
				}
				if(obstaclesTop(bullet,'bullet') === false){
					bullet.remove()
					clearInterval(bulletInterval)
				}
				if(mainOwner === 'mainTank'){
					if(enemiesArray.length>0){
						for(let j=0;j<enemiesArray.length;j++){
							if(bullet.offset().top - tableHeight*0.035 <= $(enemiesArray)[j].offset().top  && bullet.offset().top - tableHeight*0.035 - $(enemiesArray)[j].offset().top  <=tableHeight*0.035 && bullet.offset().top + tableHeight*0.035 - $(enemiesArray)[j].offset().top >= 0){
								if(bullet.offset().left - tableWidth*0.035 <= $(enemiesArray)[j].offset().left ){
									if(bullet.offset().left  >= $(enemiesArray)[j].offset().left - tableWidth*0.035){
										bullet.remove()
										$(enemiesArray[j]).remove()
										clearInterval(bulletInterval)
										enemiesArray.splice(j,1)
									}
								}
							}	
						}	
					}
				}
				if(mainOwner === 'enemy'){
					if($('img').is("#tank") && bullet.offset().top - tableHeight*0.035 <= $("#tank").offset().top  && bullet.offset().top - tableHeight*0.035 - $("#tank").offset().top <= tableHeight*0.035 && bullet.offset().top + tableHeight*0.035 - $("#tank").offset().top >=0){
						if(bullet.offset().left - tableWidth*0.035 <= $("#tank").offset().left ){
							if(bullet.offset().left >= $("#tank").offset().left - tableWidth*0.035){
								$('#tank').remove()
								bullet.remove()	
								clearInterval(bulletInterval)
								loose()
							}
						}
					}
				}
			}
			//bottom
			else if(rotation === 180){
				bullet.css({'top': '+=' + distance})
				if(bullet.offset().top + $('.bullet').height() >= endingBottom){
					bullet.remove()
					clearInterval(bulletInterval)
				}
				if(obstaclesBottom(bullet,'bullet') === false){
					bullet.remove()
					clearInterval(bulletInterval)
				}
				if(mainOwner === 'mainTank'){
					if(enemiesArray.length>0){
						for(let j=0;j<enemiesArray.length;j++){
							if($(enemiesArray)[j].offset().top <= bullet.offset().top && $(enemiesArray)[j].offset().top - bullet.offset().top+ tdHeight <= tableHeight*0.035 && $(enemiesArray)[j].offset().top - bullet.offset().top+ tdHeight >=0){
								if(bullet.offset().left - tableWidth*0.035 <= $(enemiesArray)[j].offset().left ){
									if(bullet.offset().left  >= $(enemiesArray)[j].offset().left - tableWidth*0.035){
										bullet.remove()
										$(enemiesArray[j]).remove()
										enemiesArray.splice(j,1)
										clearInterval(bulletInterval)
									}
								}
							}	
						}	
					}						
				}
				if(mainOwner === 'enemy'){
					if($('img').is("#tank") && $('#tank').offset().top <= bullet.offset().top && $('#tank').offset().top - bullet.offset().top+ tdHeight <= tableHeight*0.035 && $('#tank').offset().top - bullet.offset().top+ tdHeight >=0){
						if(bullet.offset().left - tableWidth*0.035 <= $("#tank").offset().left ){
							if(bullet.offset().left >= $("#tank").offset().left - tableWidth*0.035){
								$('#tank').remove()
								bullet.remove()	
								clearInterval(bulletInterval)
								loose()
							}
						}
					}	
				}
			}
			//right
			else if(rotation === 90){
				bullet.css({'left': '+=' + distance})
				if(bullet.offset().left + $('.bullet').width() >= endingRight){
					bullet.remove()
					clearInterval(bulletInterval)
				}
				if(obstaclesRight(bullet,'bullet') === false){
					bullet.remove()
					clearInterval(bulletInterval)
				}
				if(mainOwner === 'mainTank'){
					if(enemiesArray.length>0){
						for(let j=0;j<enemiesArray.length;j++){
							if(bullet.offset().left >= enemiesArray[j].offset().left && bullet.offset().left - enemiesArray[j].offset().left <= tdWidth && bullet.offset().left - enemiesArray[j].offset().left >=0){
								if(bullet.offset().top >= enemiesArray[j].offset().top){
									if(bullet.offset().top <= enemiesArray[j].offset().top +  tableHeight*0.035){
										bullet.remove()
										clearInterval(bulletInterval)
										$(enemiesArray[j]).remove()
										enemiesArray.splice(j,1)
									}
								}
							}	
						}
					}				
				}
				if(mainOwner === 'enemy'){
					if($('img').is("#tank") && bullet.offset().left >= $("#tank").offset().left && bullet.offset().left - $("#tank").offset().left <= tdWidth && bullet.offset().left - $("#tank").offset().left >=0){
						if(bullet.offset().top >= $("#tank").offset().top){
							if(bullet.offset().top <= $("#tank").offset().top +  tableHeight*0.035){
								$("#tank").remove()
								bullet.remove()
								clearInterval(bulletInterval)
								loose()
							}
						}
					}				
				}			
			}
			else if(rotation === -90){
				bullet.css({'left': '-=' + distance})
				if(bullet.offset().left <= $('#table').offset().left){
					bullet.remove()
					clearInterval(bulletInterval)
				}
				if(obstaclesLeft(bullet,'bullet') === false){
					bullet.remove()
					clearInterval(bulletInterval)
				}
				if(mainOwner === 'mainTank'){
					if(enemiesArray.length>0){
						for(let j=0;j<enemiesArray.length;j++){
							if(bullet.offset().left <= enemiesArray[j].offset().left + tableWidth*0.055 && bullet.offset().left  - enemiesArray[j].offset().left - tableWidth*0.055 <= tdWidth && bullet.offset().left - enemiesArray[j].offset().left + tableWidth*0.055 >=0){
								if(bullet.offset().top >= enemiesArray[j].offset().top){
									if(bullet.offset().top <= enemiesArray[j].offset().top +  tableHeight*0.035){
										bullet.remove()
										clearInterval(bulletInterval)
										$(enemiesArray[j]).remove()
										enemiesArray.splice(j,1)
									}
								}
							}	
						}
					}					
				}	
				if(mainOwner === 'enemy'){
					if($('img').is("#tank") && bullet.offset().left <= $("#tank").offset().left + tableWidth*0.055 && bullet.offset().left  - $("#tank").offset().left - tableWidth*0.055 <= tdWidth && bullet.offset().left - $("#tank").offset().left + tableWidth*0.055 >=0){
						if(bullet.offset().top >= $("#tank").offset().top){
							if(bullet.offset().top <= $("#tank").offset().top +  tableHeight*0.035){
								$("#tank").remove()
								bullet.remove()
								clearInterval(bulletInterval)
								loose()
							}
						}
					}					
				}
			}
		},bulletSpeed)
		$('.bullet').width(tableWidth*0.01).height(tableHeight*0.01)
		$(`#bullet-${Bullet.counter}`).css({'top': this._positionTop})
		$(`#bullet-${Bullet.counter}`).css({'left': this._positionLeft})
	}
}
Bullet.counter = 0
class Tank{
	constructor(row,td,img){
		this._width = tableWidth * 0.055
		this._height = tableWidth * 0.055
		this._img = img
		this._row = row
		this._td = td
		this._rotation = 0
	}
	setMainTank(){
		let moveInterval = null
		$(`table tr:eq(${this._row}) td:eq(${this._td})`).append(`<img class="tanks" id="tank" src="${this._img}">`)
		$('#tank').width(this._width).height(this._height).css('position','absolute')

		let tankWidth = $('#tank').width()
		$('body').keydown(function(e) {
			let rotation = 0
			// top
		    if($("img").is("#tank") && e.which === 38 && $('#tank').offset().top >= $('#table').offset().top){
		    	rotation+=0
		    	this._rotation = rotation
		    	$('#tank').css({
		            transform: 'rotate(' + rotation + 'deg)',
		            transition:'transform 0.1s'
		        });
			    if($("img").is("#tank") && moveInterval === null){
				    moveInterval = setInterval(function(){
				    	if($("img").is("#tank") && $('#tank').offset().top >= $('#table').offset().top){
				    		if(obstaclesTop($('#tank'),'tank') !== false && tanksCollisionTop($('#tank'),'mainTank')!==false){
				    			$('#tank').css({'top': '-=2'})
				    		}
				    	}
				    },tankSpeed)
			    }	
		    }
		    //bottom
		    else if($("img").is("#tank") && e.which === 40 && $('#tank').offset().top + tankWidth <= endingBottom){
		    	rotation+=180
		    	this._rotation = rotation
			    $('#tank').css({
		            transform: 'rotate(' + rotation + 'deg)',
		            transition:'transform 0.1s'
		        });

				if($("img").is("#tank") && moveInterval ===  null){
				    moveInterval = setInterval(function(){
				    	if($("img").is("#tank") && $('#tank').offset().top + tankWidth <= endingBottom){
				    		if(obstaclesBottom($('#tank'),'tank') !== false && tanksCollisionBot($('#tank'),'mainTank') !== false){
				    			$('#tank').css({'top': '+=2'})
				    		} 
				    	}
				    },tankSpeed)
		    	}
		    }
		    //right
		    else if($("img").is("#tank") && e.which === 39 && $('#tank').offset().left + tankWidth <= endingRight){
		    	rotation+=90
		    	this._rotation = rotation
			    $('#tank').css({
		            transform: 'rotate(' + rotation + 'deg)',
		            transition:'transform 0.1s'
		        });

		        if($("img").is("#tank") && moveInterval === null){
				    moveInterval = setInterval(function(){
				    	if($("img").is("#tank") && $('#tank').offset().left + tankWidth <= endingRight){
				    		if(obstaclesRight($('#tank'),'tank') !== false && tanksCollisionRight($("#tank"),'mainTank') !== false){
				    			$('#tank').css({'left': '+=2'})
				    		}
				    	}
				    },tankSpeed)
		    	}
		    }
		    //left
		    else if($("img").is("#tank") && e.which === 37 && $('#tank').offset().left >= $('#table').offset().left){
		    	rotation-=90
		    	this._rotation = rotation
			    $('#tank').css({
		            transform: 'rotate(' + rotation + 'deg)',
		            transition:'transform 0.1s'
		        });

			    if($("img").is("#tank") && moveInterval === null){
				    moveInterval = setInterval(function(){
				    	if($("img").is("#tank") && $('#tank').offset().left >= $('#table').offset().left){
				    		if(obstaclesLeft($('#tank'),'tank') !== false && tanksCollisionLeft($("#tank"),'mainTank') !== false){
				    			$('#tank').css({'left': '-=2'})
					    	}
				    	}
				    },tankSpeed)
		    	}
		    }
		}).keyup(function(e){
			if($("img").is("#tank")){
				//fire
				if(e.which === 37 || e.which === 38 || e.which === 39 || e.which === 40){
					clearInterval(moveInterval)
					moveInterval = null
				}
				else if(e.which === 32){
				 	if(this._rotation === undefined){
				 		this._rotation = 0
				 	}
				 	if(this._rotation === 0){
				 		let bullet = new Bullet(this._rotation,$('#tank').offset().top,$('#tank').offset().left + tankWidth/2.5,'mainTank')
				 		bullet.move()	
				 	}	
				 	if(this._rotation === 90){
				 		let bullet = new Bullet(this._rotation,$('#tank').offset().top + tankWidth/2.5,$('#tank').offset().left + tankWidth/1.1,'mainTank')
						bullet.move()
				 	}
				 	if(this._rotation === -90){
				 		let bullet = new Bullet(this._rotation,$('#tank').offset().top + tankWidth/2.2,$('#tank').offset().left,'mainTank')
						bullet.move()
				 	}
				 	if(this._rotation === 180){
				 		let bullet = new Bullet(this._rotation,$('#tank').offset().top + tankWidth*0.9,$('#tank').offset().left + tankWidth/2.2,'mainTank')
						bullet.move()
				 	}
			    }
			}
			if(enemiesArray.length === 0){
		    	win()
		    	clearInterval(moveInterval)
				moveInterval = null
		    }
		})
	}
	setEnemyTank(){
		Tank.enemiesCounter++
		let moveInterval = null
		let bulletInterval = null
		let fireInterval = null
		let fire = null
		let int = null
		let tankWidth = this._width
		let tankHeight = this._height
		$(`table tr:eq(${this._row}) td:eq(${this._td})`).append(`<img class="tanks" id="enemy-${Tank.enemiesCounter}" src="${this._img}">`)
		$(".tanks").width(this._width).height(this._height).css('position','absolute')
		function getRandom(min, max) {
		  return Math.floor(Math.random() * (max - min) + min)
		}
		let enemy = $(`#enemy-${Tank.enemiesCounter}`)
		enemiesArray.push(enemy)
		int = setInterval(function(){
			clearInterval(moveInterval)
			moveInterval = null
			let random = getRandom(1,6)
			let rotation = 0
			//top
			if(random === 1 && $('img').is(enemy)){
				rotation+=0
				this._rotation = rotation
				let random2 = getRandom(1,3)
				if(moveInterval === null && $('img').is(enemy)){
					moveInterval = setInterval(function(){
						enemy.css({
				            transform: 'rotate(' + rotation + 'deg)',
				            transition:'transform 0.1s'
				        });
						if(enemy.offset().top >= $('#table').offset().top && obstaclesTop(enemy,'tank') !==false && tanksCollisionTop(enemy,'enemy') !== false){
							enemy.css({'top': '-=2'})
							setTimeout(function(){
								clearInterval(moveInterval)
								moveInterval = null
							},random2*600)
						}
					},enemiesSpeed)					
				}
			}
			//bot
			else if((random === 2 || random === 5) && $('img').is(enemy)){
				rotation+=180
				this._rotation = rotation
				let random2 = getRandom(1,3)
				if(moveInterval === null && $('img').is(enemy)){
					moveInterval = setInterval(function(){
						enemy.css({
				            transform: 'rotate(' + rotation + 'deg)',
				            transition:'transform 0.1s'
				        });
						if(enemy.offset().top + tankHeight <= endingBottom  && obstaclesBottom(enemy,'tank') !==false && tanksCollisionBot(enemy,'enemy') !==false){
							enemy.css({'top': '+=2'})
							setTimeout(function(){
								clearInterval(moveInterval)
								moveInterval = null
							},random2*600)
						}
					},enemiesSpeed)					
				}
			}
			//left
			else if(random === 3 && $('img').is(enemy)){
				rotation+=-90
				this._rotation = rotation
				let random2 = getRandom(1,3)
				if(moveInterval === null && $('img').is(enemy)){
					moveInterval = setInterval(function(){
						enemy.css({
				            transform: 'rotate(' + rotation + 'deg)',
				            transition:'transform 0.1s'
				        });
						if(enemy.offset().left >= $('#table').offset().left && obstaclesLeft(enemy,'tank') !==false && tanksCollisionLeft(enemy,"enemy") !== false){
							enemy.css({'left': '-=2'})
							setTimeout(function(){
								clearInterval(moveInterval)
								moveInterval = null
							},random2*600)
						}
					},enemiesSpeed)					
				}
			}
			//right
			if(random === 4 && $('img').is(enemy)){
				rotation+=90
				this._rotation = rotation
				let random2 = getRandom(1,3)
				if(moveInterval === null && $('img').is(enemy)){
					moveInterval = setInterval(function(){
						enemy.css({
				            transform: 'rotate(' + rotation + 'deg)',
				            transition:'transform 0.1s'
				        });
						if(enemy.offset().left + tankWidth <= endingRight && obstaclesRight(enemy,'tank') !==false  && tanksCollisionRight(enemy,'enemy') !== false){
							enemy.css({'left': '+=2'})
							setTimeout(function(){
								clearInterval(moveInterval)
								moveInterval = null
							},random2*600)
						}
					},enemiesSpeed)					
				}
			}
			fire = getRandom(1,3)
			if(fire === 1 && $('img').is(enemy)){
				if(this._rotation === undefined){
					this._rotation = 0
				}
				if(this._rotation === 0){
					let bullet = new Bullet(this._rotation,enemy.offset().top,enemy.offset().left + tankWidth/2.5,'enemy')
					bullet.move()	
				}	
				if(this._rotation === 90){
					let bullet = new Bullet(this._rotation,enemy.offset().top + tankWidth/2.5,enemy.offset().left + tankWidth/1.1,'enemy')
					bullet.move()
				}
				if(this._rotation === -90){
					let bullet = new Bullet(this._rotation,enemy.offset().top + tankWidth/2.2,enemy.offset().left,'enemy')
					bullet.move()
				}
				if(this._rotation === 180){
					let bullet = new Bullet(this._rotation,enemy.offset().top + tankWidth*0.9,enemy.offset().left + tankWidth/2.2,'enemy')
					bullet.move()
				}

			}
			if(!$('img').is(enemy) || !$('img').is('#tank')){
				clearInterval(int)
			}
		},1000)

	}
}
Tank.enemiesCounter = 0

function win(){
	$('body').html('')
	$('body').append(`
	<div class="main">
		WIN
	</div>
	<button class="button" id="again">go to menu</button>
	`)	
	$("#again").on('click',function(){
		location.reload()
		startGame()
	})
}

function loose(){
	$('body').html('')
	$('body').append(`
	<div class="main">
		LOOSE
	</div>
	<button class="button" id="again">go to menu</button>
	`)	

	$("#again").on('click',function(){
		location.reload()
		startGame()
	})
}



function startGame(){
	$('body').html('')
	$('body').append(`
	<div class="main">
		TANKS
	</div>
	<button class="button" id="start">Start game</button>
	`)

	$("#start").on('click',function(){
		$('.main').css('display','none')
		$("#start").css('display','none')
		tableInit()

		const brick = new Obstacles(7,0,8,50,'brick')
		brick.setObstacles()

		const brick2 = new Obstacles(3,24,6,27,'brick')
		brick2.setObstacles()

		const brick3 = new Obstacles(9,24,39,27,'brick')
		brick3.setObstacles()

		const brick4 = new Obstacles(40,0,41,50,'brick')
		brick4.setObstacles()

		const brick5 = new Obstacles(42,24,46,27,'brick')
		brick5.setObstacles()


		const water = new Obstacles(14,5,34,20,'water')
		water.setObstacles()

		const grass = new Obstacles(13,4,35,5,'grass')
		grass.setObstacles()

		const grass2 = new Obstacles(13,20,35,21,'grass')
		grass2.setObstacles()

		const grass3 = new Obstacles(13,5,13,20,'grass')
		grass3.setObstacles()
					
		const grass4 = new Obstacles(35,5,35,20,'grass')
		grass4.setObstacles()


		const water2 = new Obstacles(14,31,34,46,'water')
		water2.setObstacles()

		const grass5 = new Obstacles(13,31,13,46,'grass')
		grass5.setObstacles()

		const grass6 = new Obstacles(35,31,35,46,'grass')
		grass6.setObstacles()

		const grass7 = new Obstacles(13,30,35,31,'grass')
		grass7.setObstacles()

		const grass8 = new Obstacles(13,46,35,47,'grass')
		grass8.setObstacles()


		const metal = new Obstacles(0,24,2,27,'metal')
		metal.setObstacles() 

		const metal2 = new Obstacles(47,24,50,27,'metal')
		metal2.setObstacles() 

		const tank = new Tank(45,40,mainTank)
		tank.setMainTank()

		const enemy1 = new Tank(1,10,enemyTank)
		enemy1.setEnemyTank()

		const enemy2 = new Tank(1,5,enemyTank)
		enemy2.setEnemyTank()

		const enemy3 = new Tank(1,30,enemyTank)
		enemy3.setEnemyTank()

		const enemy4 = new Tank(1,35,enemyTank)
		enemy4.setEnemyTank()	
	})
}

startGame()