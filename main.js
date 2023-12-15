let iskin = false;
let prezent_show = false;
let ship = true;
const mainBody = new Vue({
	el:'#body_main',
	data:{
		 iskin: false,
		 prezent_show: false,
         ship: true,
	}
})
const respectInfo = new Vue({
	el:'#respect--info',
	data:{  respStr:'306',
			respProc:10
			},
	methods:{
		setRespect(elem){
			this.respStr = elem
			this.respProc = 100/500*Number(elem)
		},
		toggleResp(num){
			if(confirm('Вы действительно хотите изменить значение респекта персонажа Рубедо?'))
			{
				var req = new Subsys_JsHttpRequest_Js()
					req.onreadystatechange = function()
				{
					if (req.readyState == 4)
					{
						show_result(req.responseJS.text);
					}
				}
				req.open('POST', 'http://foggystation.starcombats.com/ajax/info/info_respect.php', true);
				req.send({id: 1409213, respect: num, ix: Math.random()});
					
			this.respStr = Number(this.respStr) + num
			this.respProc = 100/500*Number(this.respStr)
			}
		}
	},
	template:`<div id="respect--info">
			<span>Респектометр: <i>{{ respStr }}</i> ед.</span>
			<div class="respect_info--container">
				<div class="respect_plus" @click="toggleResp(1)">+</div>
				<div class="respect_indicator--plus" v-bind:style="{width: respProc+'%'}"></div>
				<div class="respect_indicator--minus" v-bind:style="{width: 100-respProc +'%'}"></div>
				<div class="respect_minus" @click="toggleResp(-1)">-</div>
			</div>
		</div>`
})
const propertyDisplay = new Vue({
	el: '#property__display',
	data:{ 
		showProperty:[]		
	},
	methods:{
		obnov(elem){
			if (elem) {
				this.showProperty=[]
				for (var i = 0; i < elem.length; i++) {
					var objEl = elem[i]
					this.showProperty.push(objEl)
				}
			}
		}
	},
	template:`<ul class="property_display-show">
                    <li v-for="el in showProperty">
                    <span>{{el.name}}</span>
                    <span>{{el.val}}</span>
                    </li>
                </ul>`
})

const propertyElemBar = new Vue({
	el:'#property__bar',
	data:{
		getImg:[
			{name:'states',
				url:'http://img.starcombats.com/characteristics/inf2.gif',
				title:'Статы корабля'},
			{name:'specifications',
				url:'http://img.starcombats.com/characteristics/bonus2.gif',
				title:'Характеристики корабля'},
			{name:'statistic',
				url:'http://img.starcombats.com/characteristics/level_up.gif',
				title:'Статистика боёв'},
			{name:'statistica',
				url:'http://img.starcombats.com/characteristics/bonus1.gif',
				title:'Статистика заданий'}
		]
	},
	methods:{
		disp: function(act){
			var getImg = this.getImg
			for (var i = 0; i < getImg.length; i++) {
				var disId = getImg[i].name 
				if (act===disId) {
					document.querySelector('#stats-title img').src = this.getImg[i].url
					document.querySelector('#stats-title span').textContent = this.getImg[i].title
				}
			}
			appPropertyList(act)
		}
	},
	template:`<div id="property__bar">
                    <img v-for="elem in getImg" :src="elem.url" :alt="elem.title"
                        :title="elem.title" @click="disp(elem.name)">
                </div>`
})

const topsElemetsBar = new Vue({
	el:'#top-bar',
	data:{
		getImg:[],
		rotateImg:true
		},
	methods:{
		getTop(top){
			document.querySelector('#top_info-title span').textContent=top.title
			document.querySelector('#top_info-title img').src=top.url
			document.querySelector('#top_info-title img').title=top.title
			gettopList()
		},
		obnov(elem){
			if (elem) {
				this.getImg=[]
				for (var i = 0; i < elem.length; i++) {
					var objEl = elem[i]
					this.getImg.push(objEl)
				}
				if (this.getImg.length<5) {
					this.rotateImg = true
				} else { this.rotateImg = false }
			}
		}
	},
	template:`<div id="top-bar">
				<img v-for="im in getImg" @click="getTop(im)" :src="im.url" :alt="im.alt" :title="im.title" v-bind:class="{rotat_topimg:rotateImg}">
			  </div>`
})

const apptopList = new Vue({
	el:'.top_display--list',
	data:{
		topList:[]
	},
	methods:{
		obnov(elem){
			if (elem) {
				this.topList=[]
				for (var i = 0; i < elem.length; i++) {
					var objEl = elem[i]
					this.topList.push(objEl)
				}
			}
		}
	},
	template:`<ul class="top_display--list">
				<li v-for="pers in topList">
						<div>            
                        	<span>{{pers.num+" "}}</span>
                        	<img class="top_display--list_clan" :src="pers.klanImg" alt="">
                        	<img class="top_display--list_sklon" :src="pers.sklonImg" alt="">
                        	<span>{{pers.name}}</span>
                        	<img class="top_display--list_info" :src="pers.urlInfo" alt="">
                        </div>
                        <span>{{pers.stats}}</span>
                    </li>
			  </ul>`
}) 

const iskinDisplay = new Vue({
	el:'#info__iskin',
	data:{
		ii:[],
		plagin:[],
		neyro:[],
		ava:'',
		indicat:'',
		status: false
	},
	methods:{
		loadData(response){
				if (response) {
				this.ii.push(response)
				this.ava = 'http://img.starcombats.com/avatars/2/ii_'+ response.virus_avatar +'.gif'
				let imgip,curren,maxcu,nameip=''
				ind=0
				this.plagin=[]
				this.neyro=[]
				for (let [key, value] of Object.entries(response)) {
    				//objEl.push(`${key}`,`${value}`)
    				if (key[7]!=ind&&key[0]==='p'&&key[10]==='m') {
    					imgip ='http://img.starcombats.com/programs/' + value + '.gif'
    					//console.log(`${key}:${value}`)
    				} else if (key[0]==='p'&&key[14]==='c'){
    					curren=value
    				} else if (key[0]==='p'&&key[14]==='m'){
    					maxcu=value
    				} else if ((key[0]==='p'&&key[9]==='n')){
    					nameip=value;
    					if (Number(ind)<=4) {
    					this.plagin.push({plimg:imgip, name: nameip+' ('+curren+'/'+maxcu+')'})
    					} else {
    					this.neyro.push({plimg:imgip, name: nameip+' ('+curren+'/'+maxcu+')'})	
    					}
    				} 
    				ind=Number(key[7])
			 	}
			 	this.indicat = 'width: '+ (100/Number(response.energy_max)*Number(response.energy_current))+'%'
			} 
		}
	},
	template:`<section v-if="status" id="info__iskin">
            <div class="info_iskin--plagin" >
                <div v-for="(pl,index) in plagin">
                    <img :src="pl.plimg" :alt="pl.name" :title="pl.name">
                </div>
            </div>
            <div class="info_iskin--body" v-for="im in ii">
                <div class="iskin_state--en indicator_info">
                    <img src="info_img/ENicon.png" alt="энергия" width="14" height="10">
                    <div class="info--en_indicator">
                        <div :style="indicat" class="indicator_blue"></div>
                    </div>
                    <span>90/90</span>
                </div>
                <img id="iskin_img" :src="ava" alt="48" title="48">
            </div>
            <div class="info_iskin--plagin2" >
                <div v-for="(pl,index) in neyro">
                    <img :src="pl.plimg" :alt="pl.name" :title="pl.name">
                </div>
            </div>
            <div class="info_iskin--state" v-for="stat in ii">
                <ul class="iskin_state--parameter">
                    <li><span>емкость: {{stat.virus_capacity}}</span> <span>интеллект: {{stat.virus_intelligence}}</span></li>
                    <li><span>скорость: {{stat.virus_speed}}</span> <span>тактика: {{stat.virus_tactics}}</span></li>
                    <li><span>Поражения: {{stat.virus_loses}}</span> <span>Победы: {{stat.virus_victories}}</span></li>
                </ul>
            </div>
            <div class="iskin_name" v-for="ik in ii" ><div>Имя искина: <span>{{ik.virus_name}} ({{ik.virus_level}})</span></div><div>Дата создания: <span>{{ik.virus_born}}</span></div></div>
        </section>`
})

const shipDisplay = new Vue({
	el:'#info__ship',
	data:{
		leftBar:[{imgUrl:'http://img.starcombats.com/things_new/art_laser1_to20.gif',
					name:'Лазер Порядка (20) (артефакт) (UP)',
					modif:'Встроен имплантант', curren:'860/5000'},
					{imgUrl:'http://img.starcombats.com/things_new/n_1166_to20.gif',
					name:'Лазер Порядка (20) (артефакт) (UP)',
					modif:'Встроен имплантант', curren:'860/5000'},
					{imgUrl:'http://img.starcombats.com/things_new/cc_06_c1_to20.gif',
					name:'Лазер Порядка (20) (артефакт) (UP)',
					modif:'Встроен имплантант', curren:'860/5000'},
					{imgUrl:'http://img.starcombats.com/things_new/rsh_1555_to20.gif',
					name:'Лазер Порядка (20) (артефакт) (UP)',
					modif:'Встроен имплантант', curren:'860/5000'}],
		rightBar:[{imgUrl:'http://img.starcombats.com/things_new/art_laser1_to20.gif',
					name:'Лазер Порядка (20) (артефакт) (UP)',
					modif:'Встроен имплантант', curren:'860/5000'},
					{imgUrl:'http://img.starcombats.com/things_new/rr_1665_c35_to20.gif',
					name:'Лазер Порядка (20) (артефакт) (UP)',
					modif:'Встроен имплантант', curren:'860/5000'},
					{imgUrl:'http://img.starcombats.com/things_new/rr_166_c33_to20.gif',
					name:'Лазер Порядка (20) (артефакт) (UP)',
					modif:'Встроен имплантант', curren:'860/5000'},
					{imgUrl:'http://img.starcombats.com/things/re_1555_to20.gif',
					name:'Лазер Порядка (20) (артефакт) (UP)',
					modif:'Встроен имплантант', curren:'860/5000'}],
		moduls:[{imgUrl:'http://img.starcombats.com/things_new/arch_mod_20_Mihai.gif',
					name:'Лазер Порядка (20) (артефакт) (UP)',
					modif:'Встроен имплантант', curren:'860/5000'},
					{imgUrl:'http://img.starcombats.com/things_new/arch_gv_mod_20_Miha.gif',
					name:'Лазер Порядка (20) (артефакт) (UP)',
					modif:'Встроен имплантант', curren:'860/5000'},
					{imgUrl:'http://img.starcombats.com/things_new/arch_mod_20_Miha.gif',
					name:'Лазер Порядка (20) (артефакт) (UP)',
					modif:'Встроен имплантант', curren:'860/5000'}],
		craft_Img:'./info_img/Snow_ship_anim1.gif',
		status:true
	},
	methods:{

	},
	template:`<section v-if="status" id="info__ship">
            <div class="ship--left_bar">
                <div v-for="part in leftBar">
                     <img :src="part.imgUrl"  :alt="part.name + part.modif + part.curren" :title="part.name +' '+ part.curren+' '+ part.modif">
                </div>
            </div>
            <div class="ship--body">
                <div class="ship_body" >
                    <img :src="craft_Img">
                </div>
                <div class="ship_body--moduls" >
                    <div v-for="part in moduls">
                            <img :src="part.imgUrl" width="30" height="30" :alt="part.name + part.modif + part.curren" :title="part.name +' '+ part.curren+' '+ part.modif">
                    </div>
                </div>
            </div>
            <div class="ship--right_bar">
                <div v-for="part in rightBar">
                        <img :src="part.imgUrl" :alt="part.name + part.modif + part.curren" :title="part.name +' '+ part.curren+' '+ part.modif">
                </div>
            </div>
            <div id="ship--part"></div>
        </section>`
})
const messageWin = new Vue({
	el:'#message_sistem',
	data:{ 
		message:'',
		image:'',
		status: false,
		obrText:[],
	},
	methods:{
		setMessage(mes,res){
			var lit = 0;
			this.message = '';
				clearInterval(this.obrText)
				this.obrText = setInterval(()=>{
					if (mes.length>lit){
						this.message += mes[lit]
						this.status = res
						lit++
					} else {
						clearInterval(this.obrText)}
				}, 10)			
		},
		closeMes(){
			this.message=''
			this.status = false
			clearInterval(this.obrText)
		}
	},
	template:`<div v-if="status" id="message_sistem">
        			<img src="info_img/warning.gif">
        			<p style="padding: 0px 30px;filter: drop-shadow(0px 1px 5px #9AD5F2);">{{message}}</p>
        			<button @click="closeMes()">Закрыть сообщение</button>
    		  </div>`
})

setTimeout(()=>{
			topsElemetsBar.obnov([
				{url:"http://img.starcombats.com/top/top100.gif",
						alt:'Топ 100',
						title:'Топ 100'},
				{url:'http://img.starcombats.com/top/vip.gif',
						alt:'Характеристики корабля',
						title:'Топ VIP'},
				{url:'http://img.starcombats.com/top/viruses.gif',
						alt:'Статистика боёв',
						title:'Топ Искин'},
				{url:'http://img.starcombats.com/top/healings.gif',
						alt:'Статистика квестов',
						title:'Топ Мастер'}
				])
				messageWin.setMessage(`Мир Звездных Боев, или "StarCombats" - это онлайновая RPG игра, посвященная космическим сражениям.
						 Мы постарались сделать игру, которая жила бы своей жизнью и развивалась бы вместе с игроками и так, как хотят игроки.`,true)
 		},3000)
let gettopList=()=>{
	var responList =[
				 {num:'1',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'Легенда',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'300'},
				 {num:'2',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'Снеговик_',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'150'},
				 {num:'3',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'Картошка',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'148'},
				 {num:'4',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'котХ',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'132'},
				 {num:'5',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'Мурка',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'50'},
				 {num:'6',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'ТАИАР',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'49'},
				 {num:'7',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'Жора',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'38'},
				 {num:'8',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'Саня',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'25'},
				 {num:'9',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'Саша',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'18'},
				 {num:'10',  klanImg:'http://img.starcombats.com/clans/Dark_Empire1.gif', 
				 sklonImg:'http://img.starcombats.com/tendencydark.gif',name:'Гога',
				 urlInfo:'http://img.starcombats.com/design/info_rus.gif',stats:'12'}
		]
	apptopList.obnov(responList)
}
let appPropertyList=(nameList)=>{
		var statesList = []
			switch(nameList){
			case 'states':
				statesList=[{name:'Мощность:',val:'293 (3+290)'},
                    {name:'Маневренность:',val:'143 (3+140)'},
                    {name:'Точность:',val:'143 (3+140)'},
                    {name:'Надежность:',val:'90 (90)'},
                    {name:'Энергоемкость:',val:'743 (3+740)'},
                    {name:'Интеллект:',val:'590 (0+590)'},
                    {name:'Псионика:',val:'590 (0+590)'},
                    {name:'Мастерство:',val:'6117 (2127+3990)'},
                    {name:'Воля:',val:'0 (0)'},
                    {name:'Божественность:',val:'0 (0)'}]
					break
			case 'specifications':
				messageWin.setMessage('Данная информация доступна только игроку или администрации',true)
				/*statesList=[{name:'Наносимый урон:',val:'9365 - 10667'},
                    {name:'Броня:',val:'8799/8799/8799/8799'},
                    {name:'Мф. крита:',val:'50596'},
                    {name:'Мф. антикрита:',val:'55329'},
                    {name:'Мф. уворота:',val:'46516'},
                    {name:'Мф. антиуворота:',val:'29829'},
                    {name:'Мф. мощности крита:',val:'14515'},
                    {name:'Мф. защиты:',val:'27165'},
                    {name:'Мф. контратаки:',val:'12115'},
                    {name:'Мф. антиброни:',val:'32935'},
                    {name:'Мф. мощности урона:',val:'39400'},
                    {name:'Резист к урону:',val:'178%'},
                    {name:'Резист к техномагии:',val:'178%'}]*/
                    break
            case 'statistic':
            	statesList=[]
            		messageWin.setMessage('Игрок заблокировал возможность просмотра данной информации!',true)
            		break
            	default:
            		statesList=[]
            		break
			}
		propertyDisplay.obnov(statesList)
}
appPropertyList()
let zapros =()=>{
    var req = new Subsys_JsHttpRequest_Js()
		req.onreadystatechange = function()
		{
			if (req.readyState == 4)
			{
				if (req.responseJS.text == null)
				  text = '';
				else
				  text = req.responseJS.text;
        // document.getElementById("present_full").innerHTML = text;
console.log(text)
				// change_present_div();
				present_show = true;
			}
		}

		req.open('POST', 'http://foggystation.starcombats.com/ajax/info/info_present.php', true);
		req.send({id: 1189944, ix: Math.random()});
        console.log(req.responseJS)
}

let top_id_show =()=>{
	
}

function iskin_req()
{ 
  var respons =  { 'virus_name': 'Пролог7','virus_level': '7','virus_born': '2023-09-05 18:59:52','virus_capacity': '1','virus_speed': '25','virus_tactics': '0','virus_intelligence': '0','virus_victories': '1134','virus_loses': '506','virus_avatar': '3','program1_img': 'void','program1_id': '1','program1_life_current': '0','program1_life_max': '0','program1_name': 'Плагин','program2_img': 'void','program2_id': '1','program2_life_current': '0','program2_life_max': '0','program2_name': 'Плагин','program3_img': 'void','program3_id': '1','program3_life_current': '0','program3_life_max': '0','program3_name': 'Плагин','program4_img': 'void','program4_id': '1','program4_life_current': '0','program4_life_max': '0','program4_name': 'Плагин','program5_img': 'void','program5_id': '1','program5_life_current': '0','program5_life_max': '0','program5_name': 'Плагин','program6_img': 'void','program6_id': '1','program6_life_current': '0','program6_life_max': '0','program6_name': 'Плагин','program7_img': 'void','program7_id': '1','program7_life_current': '0','program7_life_max': '0','program7_name': 'Плагин','program8_img': 'void','program8_id': '1','program8_life_current': '0','program8_life_max': '0','program8_name': 'Плагин','energy_max': '10','energy_current': '10' }

 var moy = { 'virus_name': 'нечаянно',
  'virus_level': '10',
  'virus_born': '2011-12-16 17:11:10',
  'virus_capacity': '9',
  'virus_speed': '42',
  'virus_tactics': '8',
  'virus_intelligence': '64',
  'virus_victories': '7681',
  'virus_loses': '3203',
  'virus_avatar': '127',
  'program1_img': 'ai_health4_e',
  'program1_id': '116',
  'program1_life_current': '4',
  'program1_life_max': '20',
  'program1_name': 'Нанобот v.4.2',
  'program2_img': 'ai_healtspan_e',
  'program2_id': '115',
  'program2_life_current': '8',
  'program2_life_max': '20',
  'program2_name': 'Нанобот v.3.2',
  'program3_img': 'ai_energy3_e',
  'program3_id': '121',
  'program3_life_current': '3',
  'program3_life_max': '15',
  'program3_name': 'Аккумулятор v.3.2',
  'program4_img': 'ai_health6',
  'program4_id': '82',
  'program4_life_current': '11',
  'program4_life_max': '20',
  'program4_name': 'Нанобот v.6.1',
  'program5_img': 'decplug_7',
  'program5_id': '62',
  'program5_life_current': '104',
  'program5_life_max': '140',
  'program5_name': 'Extended Plug v.1.3',
  'program6_img': 'grady_7',
  'program6_id': '60',
  'program6_life_current': '59',
  'program6_life_max': '70',
  'program6_name': 'Мультипликатор 1.0',
  'program7_img': 'grady_7',
  'program7_id': '60',
  'program7_life_current': '59',
  'program7_life_max': '70',
  'program7_name': 'Мультипликатор 1.0',
  'program8_img': 'grady_7',
  'program8_id': '60',
  'program8_life_current': '59',
  'program8_life_max': '70',
  'program8_name': 'Мультипликатор 1.0',
  'energy_max': '90',
  'energy_current': '90' }
//   for (let [key, value] of Object.entries(respons)) {
//    // console.log(`${key}:${value}`);
//     objEl.push(`${key}`,`${value}`)
// 	}
// 	responst = []
// 	for (var i = 0; i < objEl.length; i+2) {
// 		var name = objEl[i]
// 		var conten = objEl[i+1]
// 		var cd = {name:conten}
// 		responst.push(cd)
// 	}
// console.log(respons)
 iskinDisplay.loadData(respons)
}
/*{ 'count': 2,'items': [ { 
	'item_id': '5418535',
	'life_max': '5000',
	'life_current': '219',
	'flag_gifted': '1',
	'endtime': '-1701933929',
	'flag_repair': '0',
	'destiny': '1189944',
	'clan_destiny': '0',
	'flag_impact': '0',
	'flag_block': '0',
	'flag_artefact': '1',
	'flag_mdouble_damage': '0',
	'flag_double_damage': '0',
	'destiny_name': 'Снеговик_',
	'destiny_clan_img': '',
	'destiny_clan_name': '',
	'kit_name': 'Кит Звездных Боев',
	'kit_amount': '8',
	'inside': 'Встроен <img src=\"http://img.starcombats.com/scrolls/p_ephirwhirl_2_vip.gif\" alt=\"Ether Web VIP\">  (Использований в бою: 25)',
	'img': 'sc_radar',
	'money': '20000.00',
	'euro': '0.00',
	'need_tendency': '127',
	'need_tendency_sub': '0',
	'need_level': '8',
	'need_power': '0',
	'need_mobility': '0',
	'need_computerizing': '0',
	'need_reliability': '0',
	'need_energycapacity': '0',
	'need_intelligence': '0',
	'need_psiability': '0',
	'need_skill': '0',
	'need_will': '0',
	'need_divinity': '0',
	'mod_hp': '2500',
	'mod_energy': '0',
	'mod_critical': '0',
	'mod_anticritical': '500',
	'mod_turn': '300',
	'mod_antiturn': '0',
	'mod_armor_bow': '350',
	'mod_armor_stern': '350',
	'mod_armor_left': '350',
	'mod_armor_right': '350',
	'mod_contrattack': '0',
	'mod_defence': '300',
	'mod_criticalpower': '0',
	'mod_antidefence': '500',
	'mod_damagepower': '500',
	'mod_damage_resist': '0',
	'mod_magic_resist': '0',
	'mod_damage_min': '0',
	'mod_damage_max': '0',
	'mod_power': '0',
	'mod_mobility': '0',
	'mod_computerizing': '0',
	'mod_reliability': '0',
	'mod_energycapacity': '100',
	'mod_intelligence': '100',
	'mod_psiability': '100',
	'mod_skill': '300',
	'mod_will': '0',
	'mod_divinity': '0',
	'name': 'Радар Звездных Боев',
	'tendency_desc': '',
	'tendency_sub_desc': '',
	'burn_count': '0',
	'mod_burn_min': '0',
	'mod_burn_max': '0' }*/
/*Subsys_JsHttpRequest_Js.dataReady(
  '0', // this ID is passed from JavaScript frontend
  '',
  { 'virus_name': 'нечаянно',
  'virus_level': '10',
  'virus_born': '2011-12-16 17:11:10',
  'virus_capacity': '9',
  'virus_speed': '42',
  'virus_tactics': '8',
  'virus_intelligence': '64',
  'virus_victories': '7681',
  'virus_loses': '3203',
  'virus_avatar': '127',
  'program1_img': 'ai_health4_e',
  'program1_id': '116',
  'program1_life_current': '4',
  'program1_life_max': '20',
  'program1_name': 'Нанобот v.4.2',
  'program2_img': 'ai_healtspan_e',
  'program2_id': '115',
  'program2_life_current': '8',
  'program2_life_max': '20',
  'program2_name': 'Нанобот v.3.2',
  'program3_img': 'ai_energy3_e',
  'program3_id': '121',
  'program3_life_current': '3',
  'program3_life_max': '15',
  'program3_name': 'Аккумулятор v.3.2',
  'program4_img': 'ai_health6',
  'program4_id': '82',
  'program4_life_current': '11',
  'program4_life_max': '20',
  'program4_name': 'Нанобот v.6.1',
  'program5_img': 'decplug_7',
  'program5_id': '62',
  'program5_life_current': '104',
  'program5_life_max': '140',
  'program5_name': 'Extended Plug v.1.3',
  'program6_img': 'grady_7',
  'program6_id': '60',
  'program6_life_current': '59',
  'program6_life_max': '70',
  'program6_name': 'Мультипликатор 1.0',
  'program7_img': 'grady_7',
  'program7_id': '60',
  'program7_life_current': '59',
  'program7_life_max': '70',
  'program7_name': 'Мультипликатор 1.0',
  'program8_img': 'grady_7',
  'program8_id': '60',
  'program8_life_current': '59',
  'program8_life_max': '70',
  'program8_name': 'Мультипликатор 1.0',
  'energy_max': '90',
  'energy_current': '90' }
)*/