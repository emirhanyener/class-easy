class PythonExporter extends IExporter{
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
			values += "class " + iterator.get().className;

			if(iterator.get().superClassName != ""){
				values += "(" + iterator.get().superClassName + ")";
			}

			values += ":<br>";

			//inner class scope start
			values += this.exportClass(iterator.get());
			//inner class scope end

			values += "</div><br>"
		}

		return values;
	}

	//return class code for python
	exportClass(classValue){
		var values = this.tabSpace + "def __init__(self): <br>" + this.tabSpace + this.tabSpace + "pass<br>";

		if(classValue.methods.length != 0){
			for(let i = 0; i < classValue.methods.length; i++){
				if(classValue.methods[i][1] != "void"){
					values += this.tabSpace + "def " + classValue.methods[i][2] +"(): <br>" + this.tabSpace + this.tabSpace + "return <br>";
				}
				else{
					values += this.tabSpace + "def " + classValue.methods[i][2] +"(): <br>" + this.tabSpace + this.tabSpace + "pass <br>";
				}
			}
		}
		else{
			values += this.tabSpace + "pass";
		}

		return values;
	}

	exportInterface(classValue){

	}
}