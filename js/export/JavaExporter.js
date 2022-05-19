class JavaExporter{
	constructor(){
	}
	
	exportClass(){
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
			values += "{<br><br>}</div><br><br>"
		}
		return values;
	}
}