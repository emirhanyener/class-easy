class PythonExporter extends IExporter{
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
				values += "(" + iterator.get().superClassName + ")";
			}
			values += ":<br>";
			//class scope
			if(iterator.get().classType == "class")
				values += tabSpace + "def __init__(self): <br>" + tabSpace + tabSpace + "pass<br>";
			if(iterator.get().methods.length != 0){
				for(let i = 0; i < iterator.get().methods.length; i++){
					if(iterator.get().methods[i][1] != "void")
						values += tabSpace + "def " + iterator.get().methods[i][2] +"(): <br>" + tabSpace + tabSpace + "return <br>";
					else
						values += tabSpace + "def " + iterator.get().methods[i][2] +"(): <br>" + tabSpace + tabSpace + "pass <br>";
				}
			}
			else
				values += tabSpace + "pass";
			
			//class scope end
			values += "</div><br>"
		}
		return values;
	}
}