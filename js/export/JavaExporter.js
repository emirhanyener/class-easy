class JavaExporter extends IExporter{
	constructor(){
		super();
	}
	
	exportStruct(){
		var tabSpace = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
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
			//class scope
			if(iterator.get().classType == "class"){
				values += tabSpace + "public " + iterator.get().className + "() {<br><br>" + tabSpace + "}<br>";
			
				for(let i = 0; i < iterator.get().methods.length; i++){
					if(iterator.get().methods.length != 0){
						if(iterator.get().methods[i][1] != "void")
							values += tabSpace + iterator.get().methods[i][0] + " " + iterator.get().methods[i][1] + " " + iterator.get().methods[i][2] + "(){ <br>" + tabSpace + tabSpace + "return //return " + iterator.get().methods[i][1] + " type<br>" + tabSpace + "}<br>";
						else
							values += tabSpace + iterator.get().methods[i][0] + " void " + iterator.get().methods[i][2] + "(){ <br>" + tabSpace + "<br>" + tabSpace + "}<br>";

					}
				}
			}
			else{
				for(let i = 0; i < iterator.get().methods.length; i++){
					if(iterator.get().methods.length != 0)
						values += tabSpace + iterator.get().methods[i][0] + " " + iterator.get().methods[i][1] + " " + iterator.get().methods[i][2] + "();<br>";
				}
			}
			//class scope end
			values += "}</div><br>"
		}
		return values;
	}
}