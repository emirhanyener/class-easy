class CPlusPlusExporter extends ILanguageExporter{
	constructor(){
		super();
	}
	
	exportClass(){
		var tabSpace = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		var values = "";
		var iterator = new ClassValueListIterator(list);
		
		while(iterator.next()){
			values += "<div class = 'exportedClass'>"
			values += "class " + iterator.get().className;
			if(iterator.get().superClassName != ""){
				values += " : " + iterator.get().superClassName;
			}
			values += "{<br>";
			//class scope
			if(iterator.get().classType == "class")
				values += tabSpace + "public:<br> " + tabSpace + iterator.get().className + "() {<br><br>" + tabSpace + "}";
			
			//class scope end
			values += "<br>}</div><br><br>"
		}
		return values;
	}
}