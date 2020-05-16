var mas = [];
var Test_number = 0;
var Test_point = 0;
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


function randomInteger(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function getArgs(formule){
	var rx = new RegExp("[A-Z]");
		var args = [];
		var i, j;
		var count;
		for (i = 0; i< formule.length; i++){
			if (rx.test(formule[i])){
				if (args.length == 0) args.push(formule[i]);
				else {
					count = 0;
					for (j=0; j<args.length; j++){
						if (args[j] == formule[i]) count++;
					}
					if (count == 0) args.push(formule[i]);
				}
			}
		}	
		console.log(args);
		return args;
}

function incr(val){
	val[val.length-1]++;
	for (i= val.length-1; i>=0; i--){
		if (val[i] == 2){
			val[i] = 0;
			if (i!=0) val[i-1]++;
		} 
	}
	return val;
}

function createTable(args){
	var i, j;
	var cell;
	var label;
	var val = [];
	var name;
	for (i= 0; i<args.length; i++) val.push(0);
	label = `<br>`;
	document.body.innerHTML += label;
	for (i=0; i<args.length; i++){
		cell = args[i];
		label = `<label id='${cell}'> ${cell} </label>`;
		document.body.innerHTML += label;
	}
		cell = "Res";
		label = `<label id='${cell}'> ${cell} </label>`;
		document.body.innerHTML += label;
		label = `<br>`;
		document.body.innerHTML += label;

	for (i=0; i<Math.pow(2, args.length); i++){
		for (j=0; j<=args.length; j++){
			name = String(i) + String(j);
			if (j!=args.length) cell = String(val[j]);
			else cell = "   ";
			label = `<label id='${name}'> ${cell} </label>`;
			document.body.innerHTML += label;
		}
		val = incr(val);
		label = `<br>`;
		document.body.innerHTML += label;
	}
}

function fillTable(args){
	var i;
	var name;
	var cell;
	for (i=0; i<Math.pow(2, args.length); i++){
		name = String(i) + String(args.length);
		cell = Number(mas[i]);
		document.getElementById(name).innerHTML = " " + cell + " ";
	}
}

function check(formule){
	var x;
	var stop;
	var large_stop;
	var rx0 = new RegExp("\\(!0\\)");
	var rx1 = new RegExp("\\(!1\\)");
	var rxAnd0 = new RegExp("(0&0)\|(0&1)\|(1&0)");
	var rxAnd1 = new RegExp("1&1");
	var rxOr1 = new RegExp("(1\\|1)\|(0\\|1)\|(1\\|0)");
	var rxOr0 = new RegExp("0\\|0");
	var rxEq0 = new RegExp("(1~0)\|(0~1)");
	var rxEq1 = new RegExp("(1~1)\|(0~0)");
	var rxIm0 = new RegExp("1->0");
	var rxIm1 = new RegExp("(0->0)\|(0->1)\|(1->1)");
	var rxP0 = new RegExp("\\(0\\)");
	var rxP1 = new RegExp("\\(1\\)");
	x = "error";
	console.log("проверка");
	while(true){
		stop = 0;
		if (rx0.test(formule)) {
			stop++;
			formule = formule.replace(rx0,'1');
		}

		if (rx1.test(formule)) {
			stop++;
			formule = formule.replace(rx1,'0');
		}
		if (stop == 0) break;
	}


	console.log(formule);
	
	while (true){
		large_stop = 0;
		while(true){
			stop = 0;
			if (rxAnd0.test(formule)) {
				stop++;
				formule = formule.replace(rxAnd0,'0');
			}

			if (rxAnd1.test(formule)) {
				stop++;
				formule = formule.replace(rxAnd1,'1');
			}
			if (stop != 0) large_stop++;
			if (stop == 0) break;
		}
		//console.log(formule);
		while(true){
			stop = 0;
			if (rxOr1.test(formule)) {
				stop++;
				formule = formule.replace(rxOr1,'1');
			}

			if (rxOr0.test(formule)) {
				stop++;
				formule = formule.replace(rxOr0,'0');
			}
			if (stop != 0) large_stop++;
			if (stop == 0) break;
		}
		//console.log(formule);
		while(true){
			stop = 0;
			if (rxIm0.test(formule)) {
				stop++;
				formule = formule.replace(rxIm0,'0');
			}

			if (rxIm1.test(formule)) {
				stop++;
				formule = formule.replace(rxIm1,'1');
			}
			if (stop != 0) large_stop++;
			if (stop == 0) break;
		}
		//console.log(formule);
		while(true){
			stop = 0;
			if (rxEq0.test(formule)) {
				stop++;
				formule = formule.replace(rxEq0,'0');
			}

			if (rxEq1.test(formule)) {
				stop++;
				formule = formule.replace(rxEq1,'1');
			}
			if (stop != 0) large_stop++;
			if (stop == 0) break;
		}
		//console.log(formule);
		while(true){
			stop = 0;
			if (rxP0.test(formule)) {
				stop++;
				formule = formule.replace(rxP0,'0');
			}

			if (rxP1.test(formule)) {
				stop++;
				formule = formule.replace(rxP1,'1');
			}
			if (stop != 0) large_stop++;
			if (stop == 0) break;			
		}
		console.log(formule);
		if (large_stop == 0) break;
	}
	console.log("result -> " + formule);
	if (formule == "0") x = false;
	if (formule == "1") x = true;
	return x;
}


function checkimpl(){
	var i;
	var count = 0;
	for (i = 0; i< mas.length; i++)
		if (mas[i] == 1) count++;
	if (count == 0) return false;
	else return true;
}

function changeArguments(formule, args, current ,a){
	var changed_formule = formule;
	var f;
	if (a == 1) changeArguments(formule, args, current, 0);

	while(true){
			f = 0;
			if (changed_formule.search(args[current]) != -1) f++;
			if (f == 0) break;
			changed_formule = changed_formule.replace(args[current], a);
	}
	if (current == args.length - 1){
		mas.push(check(changed_formule));
		//console.log("current " + current + "a " + a);
		return;
	}
	changeArguments(changed_formule, args, current + 1, 1);
}

function checkFormule(formule){
	var s = formule;
	var rx1 = new RegExp("\\(![A-Z]\\)");
	var rx2 = new RegExp("([A-Z]|0)");
	var rx3 = new RegExp("(([A-Z]|0|1)(\\||&|(->)|~))+([A-Z]|0|1)");
	var rx4 = new RegExp("\\(1\\)");
	var stop;
	while (true){
		stop = 0;
		if (rx1.test(s)) {
			stop++;
			s = s.replace(rx1,'1');
		}
		if (stop == 0) break;
	}
	while (true){
		stop = 0;
		if (rx3.test(s)) {
			stop++;
			s = s.replace(rx3,'1');
		}
		if (rx4.test(s)) {
			stop++;
			s = s.replace(rx4,'1');
		}
		if (stop == 0) break;
	}
	while (true){
		stop = 0;
		if (rx2.test(s)) {
			stop++;
			s = s.replace(rx2,'1');
		}
		if (stop == 0) break;
	}
	if(s == '1' || s == '1\0') return true;
	return false;
}

function fillFormule(string, atr, at_amount){
	var x;
	while(true){
		if (string.length>20) break;
		if (randomInteger(0,3) == 2) break;
		x = randomInteger(0,4);
		if (x == 0){
			string += "&";
		}
		if (x == 1){
			string += "|";
		}
		if (x == 2){
			string += "->";
		}
		if (x == 3){
			string += "~";
		}
		x = randomInteger(0,3);
		if (x == 2){
			string += "(";
			string += atr[randomInteger(0,at_amount)];
			string = fillFormule(string, atr, at_amount);
			string += ")";
		}
		else{ 
			if (randomInteger(0,1) == 1) string += atr[randomInteger(0,at_amount)];
			else{
				string += "(!";
				string += atr[randomInteger(0,at_amount)];
				string += ")";
			}
		}
	}
	return string;
}

function createFormule(){
	var atr = [];
	var i;
	var at_amount;
	var count;
	var string = "";

	at_amount = randomInteger(2,4);
	count =0;
	i = 0;
	while (count<at_amount){
		if (i==alphabet.length-1) i = 0;
		if (randomInteger(0,10) > 5){
			count++;
			atr.push(alphabet[i]);
		}
		i++;
	}
	console.log(at_amount);
	console.log(atr);
	string += atr[randomInteger(0,at_amount)];
	string = fillFormule(string, atr, at_amount);
	document.getElementById("test").value = string;
}

function test(b){
	if (document.getElementById("test").value == "") return;
	var formuleF = document.getElementById("test").value;
	var stop;
	var agrs;
	var bl;
	console.log(formuleF);
	mas = [];
	args = getArgs(formuleF);
	changeArguments(formuleF, args, 0, 1);
	bl = checkimpl();
	if (bl == b) Test_point++;
	if (Test_number == 4){
		document.getElementById("result").innerHTML = "Ваш результат " + Test_point + " из 5";
		Test_number = 0;
		Test_point = 0;
		return;
	} 
	Test_number++;
	createFormule();
}

function main(){
	var b;
	var args = [];
	var formuleF = document.getElementById("input").value;
	mas = [];
	b = checkFormule(formuleF);
	if (!b) {
		document.getElementById("output").innerHTML = "Формула записана не верно";
		return;
	}
	args = getArgs(formuleF);
	if(args.length == 0){
		mas.push(check(formuleF));
	}
	else{
		createTable(args);
		changeArguments(formuleF, args, 0, 1);
	}
	b = checkimpl(); 
	if (b) document.getElementById("output").innerHTML = "Выполнимая";
	else document.getElementById("output").innerHTML = "Невыполнимая";
	if (args.length != 0) fillTable(args);
	return;
}

function startTest(){
	createFormule();
}
