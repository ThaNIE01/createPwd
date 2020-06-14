let vue = new Vue({
	el: '#box',
	data: {
		//判断是否开启选项
		y_case: true,         //大写
		y_lowCase: true,      //小写
		y_num: true,          //数字
		y_symbol: false,      //符号
		y_length: "8",        //长度
		y_password: "",       //密码

		//密码组合
		numArr: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		lowcaseArr: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't','u', 'v', 'w', 's', 'y', 'z'],
		caseArr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U','V', 'W', 'S', 'Y', 'Z'],
		symbolArr: ['_', '-', '$', '%', '@', '+', '&', '#', '!'],
		
		//复制提示文本
		iscopytext: true,
	},

	methods: {
		
		//获取input中的内容
		y_copy(){
			
			document.querySelector("#copyinput").select();
			document.execCommand("Copy");
			if (this.y_password === "") {
			                this.iscopytext = "点击复制";
			                this.iscopytext = true;
			            } else {
			                this.iscopytext = "复制成功";
			                this.iscopytext = false;
			                alert("复制成功");
			            }
			
			// alert("复制成功");
			// this.iscopytext =! this.iscopytext;
			
		},
		
		
		//获取数字
		getNumFunc() {
			return this.getfunc(this.numArr.length, this.numArr)
		},
		//获取大写
		getCaseFunc() {
			return this.getfunc(this.caseArr.length, this.caseArr)
		},
		//获取小写
		getLowcaseFunc() {
			return this.getfunc(this.lowcaseArr.length, this.lowcaseArr)
		},
		//获取字符
		getsymbolFunc() {
			return this.getfunc(this.symbolArr.length, this.symbolArr)
		},


		//封装
		getfunc(typelength, type) {
			let x = Math.floor(Math.random() * typelength);
			return type[x];
		},


	


		//点击方法
		y_submit() {
			//获取调用取得单个密码的集合 
			let getRandomPwd = {
				number: this.getNumFunc,
				Case: this.getCaseFunc,
				lowCase: this.getLowcaseFunc,
				symbol: this.getsymbolFunc,
			};
			// console.log(getRandomPwd)
			//密码函数
			function createpwd(length, number, lowCase, Case, symbol) {
				let createpwd = ""; //临时存放
				let typesCount = number + lowCase + Case + symbol; //多少个选项为 true
				// console.log(typesCount);

				// 判断是哪几个选项为 true
				let actTypeArr = [{number}, {lowCase}, {Case}, {symbol}].filter(function(item) {
					return Object.values(item)[0];
				});
				// console.log(actTypeArr);
				
				//如果什么选项都没选
				if (typesCount === 0) {
					alert("需要至少选择一个选项！");
					return;
				};
				// 循环遍历密码 根据长度循环
				for(let i = 0; i<length; i++){

					actTypeArr.forEach(function(type){ //长度有多少就循环多少个类型出来，然后将类型作为传参的方式传入，生成相应的密码
						let typeName = Object.keys(type)[0];  //获取键名
						// console.log(typeName);
						// 根据键名创建密码（调用方法名）
						createpwd += getRandomPwd[typeName]();
					})
					// console.log(createpwd);
				};
				return createpwd.slice(0,length);
			}
			
			let temp = createpwd(this.y_length, this.y_num, this.y_case, this.y_lowCase, this.y_symbol);
			
			this.y_password = temp;
			
		},
		
		
		//选项开关的控制
		
		//判断是否开启数字
		isNum() {
			this.y_num = !this.y_num;
		},
		//判断是否开启大写
		isCase() {
			this.y_case = !this.y_case;
		},
		//判断是否开启小写
		isLowcase() {
			this.y_lowCase = !this.y_lowCase;
		},
		//判断是否开启字符
		isSym() {
			this.y_symbol = !this.y_symbol;
		},
		
	},
	
});
