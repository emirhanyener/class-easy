class JavaExporter extends IExporter{
	tabSpace = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	constructor(){
		super();
	}
	
	//export code struct from list
	exportStruct(){
		var values = "";
		var iterator = new ClassValueListIterator(list);
		
		while(iterator.next()){
			values += "<div class = 'exportedClass'>"
			values += iterator.get().classType + " " + iterator.get().className;

			if(iterator.get().superClassName != ""){
				if(iterator.get().superClassType == "class")
					values += " extends " + iterator.get().superClassName;
				if(iterator.get().superClassType == "interface")
					values += " implements " + iterator.get().superClassName;
			}

			values += "{<br>";

			//inner class scope start
			if(iterator.get().classType == "class"){
				values += this.exportClass(iterator.get());
			}
			else{
				values += this.exportInterface(iterator.get());
			}
			//inner class scope end

			values += "}</div><br>"
		}

		return values;
	}

	//return class code for java
	exportClass(classValue){
		var values = "";
		values += this.tabSpace + "public " + classValue.className + "() {<br><br>" + this.tabSpace + "}<br>";
			
		for(let i = 0; i < classValue.methods.length; i++){
			if(classValue.methods.length != 0){
				if(classValue.methods[i][1] != "void"){
					values += this.tabSpace + classValue.methods[i][0] + " " + classValue.methods[i][1] + " " + classValue.methods[i][2] + "(){ <br>" + this.tabSpace + this.tabSpace + "return //return " + classValue.methods[i][1] + " type<br>" + this.tabSpace + "}<br>";
				}
				else{
					values += this.tabSpace + classValue.methods[i][0] + " void " + classValue.methods[i][2] + "(){ <br>" + this.tabSpace + "<br>" + this.tabSpace + "}<br>";
				}
			}
		}

		return values;
	}

	//return interface code for java
	exportInterface(classValue){
		var values = "";

		for(let i = 0; i < classValue.methods.length; i++){
			if(classValue.methods.length != 0){
				values += this.tabSpace + classValue.methods[i][0] + " " + classValue.methods[i][1] + " " + classValue.methods[i][2] + "();<br>";
			}
		}

		return values;
	}
}