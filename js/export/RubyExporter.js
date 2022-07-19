class RubyExporter extends IExporter{
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
				values += " < " + iterator.get().superClassName;
			}

			values += "<br>";

			//inner class scope start
			values += this.exportClass(iterator.get());
			//inner class scope end

			values += "end</div><br>"
		}

		return values;
	}

	//return class code for ruby
	exportClass(classValue){
		var values = "";
		values += this.tabSpace + "def initialize <br><br>" + this.tabSpace + "end<br>";
			
		for(let i = 0; i < classValue.methods.length; i++){
			if(classValue.methods.length != 0){
				values += this.tabSpace + "def " + classValue.methods[i][2] + " <br>" + this.tabSpace + this.tabSpace + "return #return " + classValue.methods[i][1] + " type<br>" + this.tabSpace + "end<br>";
			}
		}

		return values;
	}

	//return interface code for ruby
	exportInterface(classValue){}
}