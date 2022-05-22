class ExportClass{
	constructor(list){
		this.list = list;
		this.language = new IExporter();
	}
	
	//return all code struct
	exportStruct(){
		return this.language.exportStruct();
	}
	
	//change programming language
	//* changeProgrammingLanguage(new JavaExporter);
	changeProgrammingLanguage(language){
		this.language = language;
	}
}