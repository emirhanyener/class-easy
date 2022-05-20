class ExportClass{
	constructor(list){
		this.list = list;
		this.language = new ILanguageExporter();
	}
	
	exportClass(){
		return this.language.exportClass();
	}
	
	changeLanguage(language){
		this.language = language;
	}
}