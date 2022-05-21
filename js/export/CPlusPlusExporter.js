class CPlusPlusExporter extends IExporter{
	constructor(){
		super();
	}
	
	exportStruct(){
		var tabSpace = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
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
			if(this.countPrivateMethods(iterator)){
				values += tabSpace + "private:<br> ";
				for(let i = 0; i < iterator.get().methods.length; i++){
					if(iterator.get().methods[i][0] == "private"){
						if(iterator.get().classType == "class"){
							if(iterator.get().methods[i][1] == "void")
								values += tabSpace + "void "+ iterator.get().methods[i][2] +"() {<br><br>" + tabSpace + "}<br>";
							else
								values += tabSpace + iterator.get().methods[i][1] + " "+ iterator.get().methods[i][2] +"() {<br>" + tabSpace + tabSpace + "return //"+ iterator.get().methods[i][1] + "<br>" + tabSpace + "}<br>";
						}
						else{
							if(iterator.get().methods[i][1] == "void")
								values += tabSpace + "void "+ iterator.get().methods[i][2] +"() = 0;<br>";
							else
								values += tabSpace + iterator.get().methods[i][1] + " "+ iterator.get().methods[i][2] +"() = 0;<br>";

						}
					}
				}
			}
			if(iterator.get().classType == "class")
				values += tabSpace + "public:<br> " + tabSpace + iterator.get().className + "() {<br><br>" + tabSpace + "}<br>";
			else
				values += tabSpace + "public:<br>";
			for(let i = 0; i < iterator.get().methods.length; i++){
				if(iterator.get().methods[i][0] == "public"){
					if(iterator.get().classType == "class"){
						if(iterator.get().methods[i][1] == "void")
							values += tabSpace + "void "+ iterator.get().methods[i][2] +"() {<br><br>" + tabSpace + "}<br>";
						else
							values += tabSpace + iterator.get().methods[i][1] + " "+ iterator.get().methods[i][2] +"() {<br>" + tabSpace + tabSpace + "return //"+ iterator.get().methods[i][1] + "<br>" + tabSpace + "}<br>";
					}
					else{
						if(iterator.get().methods[i][1] == "void")
							values += tabSpace + "void "+ iterator.get().methods[i][2] +"() = 0;<br>";
						else
							values += tabSpace + iterator.get().methods[i][1] + " "+ iterator.get().methods[i][2] +"() = 0;<br>";
					}
				}
			}
			
			//class scope end
			values += "}</div><br>"
		}
		return values;
	}
	
	countPrivateMethods(iterator){
		for(let i = 0; i < iterator.get().methods.length; i++){
			if(iterator.get().methods[i][0] == "private"){
				return true;
			}
		}
		return false;
	}
	countPublicMethods(iterator){
		for(let i = 0; i < iterator.get().methods.length; i++){
			if(iterator.get().methods[i][0] == "public"){
				return true;
			}
		}
		return false;
	}
}