class CPlusPlusExporter extends IExporter{
	tabSpace = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	constructor(){
		super();
	}
	
	exportStruct(){
		var values = "";
		var iterator = new ClassValueListIterator(list);
		
		while(iterator.next()){
			values += "<div class = 'exportedClass'>"
			values += "class " + iterator.get().className;
			if(iterator.get().superClassName != ""){
				values += " : public " + iterator.get().superClassName;
			}
			values += "{<br>";
			//class scope
			
			if(iterator.get().classType == "class")
				values += this.exportClass(iterator.get());
			else
				values += this.exportInterface(iterator.get());

			//class scope end
			values += "}</div><br>"
		}
		return values;
	}

	exportClass(classValue){
		var values = "";
		if(this.countPrivateMethods(classValue)){
			values += this.tabSpace + "private:<br> ";
			for(let i = 0; i < classValue.methods.length; i++){
				if(classValue.methods[i][0] == "private"){
					if(classValue.methods[i][1] == "void")
						values += this.tabSpace + "void "+ classValue.methods[i][2] +"() {<br><br>" + this.tabSpace + "}<br>";
					else
						values += this.tabSpace + classValue.methods[i][1] + " "+ classValue.methods[i][2] +"() {<br>" + this.tabSpace + this.tabSpace + "return //"+ classValue.methods[i][1] + "<br>" + this.tabSpace + "}<br>";
				}
			}
		}
		
		values += this.tabSpace + "public:<br> " + this.tabSpace + classValue.className + "() {<br><br>" + this.tabSpace + "}<br>";
		if(this.countPublicMethods(classValue)){
			for(let i = 0; i < classValue.methods.length; i++){
				if(classValue.methods[i][0] == "public"){
					if(classValue.methods[i][1] == "void")
						values += this.tabSpace + "void "+ classValue.methods[i][2] +"() {<br><br>" + this.tabSpace + "}<br>";
					else
						values += this.tabSpace + classValue.methods[i][1] + " "+ classValue.methods[i][2] +"() {<br>" + this.tabSpace + this.tabSpace + "return //"+ classValue.methods[i][1] + "<br>" + this.tabSpace + "}<br>";
				}
			}
		}

		return values;
	}

	exportInterface(classValue){
		var values = "";
		
		if(this.countPrivateMethods(classValue)){
			values += this.tabSpace + "private:<br> ";
			for(let i = 0; i < classValue.methods.length; i++){
				if(classValue.methods[i][0] == "private"){
					if(classValue.methods[i][1] == "void")
						values += this.tabSpace + "virtual void "+ classValue.methods[i][2] +"() = 0;<br>";
					else
						values += this.tabSpace + "virtual " + classValue.methods[i][1] + " "+ classValue.methods[i][2] +"() = 0;<br>";
				}
			}
		}

		if(this.countPublicMethods(classValue)){
			values += this.tabSpace + "public:<br>";
			for(let i = 0; i < classValue.methods.length; i++){
				if(classValue.methods[i][0] == "public"){
					if(classValue.methods[i][1] == "void")
						values += this.tabSpace + "virtual void "+ classValue.methods[i][2] +"() = 0;<br>";
					else
						values += this.tabSpace + "virtual " + classValue.methods[i][1] + " "+ classValue.methods[i][2] +"() = 0;<br>";
				}
			}
		}
		
		return values;
	}
	
	countPrivateMethods(classValue){
		for(let i = 0; i < classValue.methods.length; i++){
			if(classValue.methods[i][0] == "private"){
				return true;
			}
		}
		return false;
	}

	countPublicMethods(classValue){
		for(let i = 0; i < classValue.methods.length; i++){
			if(classValue.methods[i][0] == "public"){
				return true;
			}
		}
		return false;
	}
}