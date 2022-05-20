class CSharpExporter extends ILanguageExporter{
	constructor(){
		super();
	}
	
	exportClass(){
		var tabSpace = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		var values = "";
		var iterator = new ClassValueListIterator(list);
		
		while(iterator.next()){
			values += "<div class = 'exportedClass'>"
			values += iterator.get().classType + " " + iterator.get().className;
			if(iterator.get().superClassName != ""){
				values += " : " + iterator.get().superClassName;
			}
			values += "{<br>";
			//class scope
			if(iterator.get().classType == "class")
				values += tabSpace + "public " + iterator.get().className + "() {<br><br>" + tabSpace + "}";
			
			//class scope end
			values += "<br>}</div><br><br>"
		}
		return values;
	}
}