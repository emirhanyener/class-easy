class PythonExporter extends ILanguageExporter{
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
				values += "(" + iterator.get().superClassName + ")";
			}
			values += ":<br>";
			//class scope
			if(iterator.get().classType == "class")
				values += tabSpace + "def __init__(self): <br>" + tabSpace + tabSpace + "pass";
			else
				values += tabSpace + "pass";
			
			//class scope end
			values += "<br></div><br><br>"
		}
		return values;
	}
}