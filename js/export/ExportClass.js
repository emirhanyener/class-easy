class ExportClass{
	constructor(list){
		this.list = list;
		this.language = new IExporter();
	}
	
	exportStruct(){
		return this.language.exportStruct();
	}
	
	changeProgrammingLanguage(language){
		this.language = language;
	}
}