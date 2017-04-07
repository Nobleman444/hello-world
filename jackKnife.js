/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 
 * 
 * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * pureLetters: String -> String
 * 
 * returns a string with only lowercase letters
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function pureLetters(str) {
	var ret = str;
	if (typeof str == "string") ret = str.toLowerCase().replace(/[^a-z]/g, "");
	return ret;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * unpop: Array -> ?
 * 
 * returns the last element of an array
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function unpop(x) {
	var ret = x;
	
	if (Array.isArray(x)) {
		ret = x.pop();
		x.push(ret);
	}
	
	return ret;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * exact: Array(2) -> Boolean
 * 
 * returns true if two arrays are identical
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function exact(m1, m2) {
  var ret = false;
	
  if (Array.isArray(m1) && Array.isArray(m2) && m1.length == m2.length) {
		ret = m1.every(function(u, i) {return u == this[i];}, m2);
	}
	
  return ret;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * getAll: String(2), [HTMLElement] -> HTMLElement|NodeList
 * 
 * returns a specified element or list of elements
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function getAll(lookBy, lookFor, lookIn) {
	var ret = document;

	if (!(lookIn instanceof HTMLElement)) lookIn = document;
	
	switch (lookBy) {
		case "i":
		case "id": ret = lookIn.getElementById(lookFor); break;
		
		case "t":
		case "tag": ret = lookIn.getElementsByTagName(lookFor); break;
		
		case "c":
		case "class": ret = lookIn.getElementsByClassName(lookFor); break;
		
		case "s":
		case "q":
		case "css":
		case "query":
		case "selector": ret = lookIn.querySelectorAll(lookFor);
	}
	
	return ret;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * percErr: Number(2) -> Number
 * 
 * returns the percent error between two numbers
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function percErr(x, y) {
	return Math.abs(x - y) / x;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * condense: Number -> Number
 * 
 * returns a number without unnecessary decimal places
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function condense(n) {
	var i = 0;
	for (let p = 1; p > 1e-10; i++) p = percErr(n, n.toPrecision(i));
	return n.toPrecision(i);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * TimeCalc: __ -> __
 * 
 * object constructor
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function TimeCalc() {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * TimeCalc::nom2num: String|Number -> Number|String
	 * 
	 * returns a certain integer based on a given string
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	function nom2num(nom) {
		var num = 0;
		
		if (typeof nom == "string") {
			switch (nom.toLowerCase()) {
				case "y":
				case "year":
				case "years": num = 1; break;
				
				case "mo":
				case "month":
				case "months": num = 2; break;
				
				case "d":
				case "day":
				case "days": num = 3; break;
				
				case "h":
				case "hour":
				case "hours": num = 4; break;
				
				case "mn":
				case "min":
				case "mins":
				case "minute":
				case "minutes": num = 5; break;
				
				case "s":
				case "sec":
				case "secs":
				case "second":
				case "seconds": num = 6; break;
				
				case "ms":
				case "milli":
				case "millisec":
				case "millisecond":
				case "milliseconds": num = 7; break;
				
				default: num = "Invalid Input";
			}
		} else if (typeof nom == "number") {
			num = (isValid(nom, true)) ? nom : "Invalid value";
		} else {
			num = "Invalid Type";
		}
		
		return num;
	}

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * TimeCalc::isValid: Number, [Boolean] -> Boolean
	 * 
	 * returns true if a number falls within a certain range of integers
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	function isValid(x, full) {
		return Number.isInteger(x) && x >= (full ? 1 : 3) && x <= 7;
	}

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * TimeCalc::time2time: Number|String(2), Number -> Number
	 * 
	 * returns a given amount of time in different units
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	function time2time(fr, to, num) {
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * TimeCalc::time2time::Factor: __ -> __
		 * 
		 * object constructor
		 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		function Factor() {
			this[3] = 24;
			this[4] = 60;
			this[5] = 60;
			this[6] = 1000;
			this[-7] = 1000;
			this[-6] = 60;
			this[-5] = 60;
			this[-4] = 24;
		};
		
		var factor = new Factor(), fr = nom2num(fr), to = nom2num(to), ret = num;
		
		if (isValid(fr) && isValid(to)) {
			if (fr < to) for (let i = fr; i < to; i++) ret *= factor[i];
			else for (let i = -fr; i < -to; i++) ret /= factor[i];
		}
		
		return ret;
	} this.foo = time2time;
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * TimeCalc::format: String|Number, Number|String -> Object
	 * 
	 * returns a given amount of time as a whole number with the remainder in 
	 * smaller units
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	function format(type, num) {
		var ret = {cur: 0, nxt: 0};
		
		type = nom2num(type);
		if (typeof num == "string") num = parseFloat(num);
		
		if (isValid(type) && !isNaN(num)) {
			if (type < 7) {
				ret.cur = Math.floor(num);
				ret.nxt = time2time(type, type + 1, num - ret.cur);
			} else {
				ret.cur = num;
				ret.nxt = 0;
			}
			
			ret.nxt = condense(ret.nxt);
		}
		
		return ret;
	}

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * 
	 * 
	 * 
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	this.conv = function(fr, to) {
		var time = [], ret = 0;
		
		if (typeof fr == "string") fr = nom2num(fr);
		if (typeof to == "string") to = nom2num(to);
		
		if (isValid(fr) && isValid(to)) {
			for (let i = fr; i <= 7; i++) {
				let aj = arguments[i - fr + 2];
				time.push((typeof aj != "number") ? 0 : aj);
			}
			
			for (let i = 0; i < time.length; i++) {
				ret += time2time(fr + i, to, time[i]);
			}
		}
		
		return ret;
	};
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * 
	 * 
	 * 
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	this.form = function(type, num) {
		var n = num, ret = "";
		
		if (typeof type == "string") type = nom2num(type);
		if (typeof num == "string") num = parseFloat(num);
		
		if (isValid(type) && !isNaN(num)) {
			for (let i = type; i <= 7 && n > 0; i++) {
				let f = format(i, n);
				if (i != type) ret += ":";
				ret += f.cur;
				n = f.nxt;
			}
		}
		
		return ret;
	};
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * 
	 * 
	 * 
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	this.now = function(type) {
		var ret = new Date();
		
		if (typeof type == "string") type = nom2num(type);
		
		switch (type) {
			
		}
	};
}