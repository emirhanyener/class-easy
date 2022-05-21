var list = new ClassValue();

var addedValues = document.getElementById("addedValuesDiv");
var classType = document.getElementById("classType");
var className = document.getElementById("className");
var superClassName = document.getElementById("superClassName");
var superClassType = document.getElementById("superClassType");

var methodsTable = document.getElementById("methodsTable");

var programmingLanguage = document.getElementById("programmingLanguage");
var exportedStruct = document.getElementById("exportedStruct");
var ec = new ExportClass(list);
ec.changeProgrammingLanguage(new JavaExporter());

programmingLanguage.addEventListener("change", function(event) {
	changeClassProgrammingLanguage(eval(programmingLanguage.value));
});

function addClass(){
	methodModifiers = document.getElementsByClassName("methodModifierItem");
	methodNames = document.getElementsByClassName("methodNameItem");
	methodReturnTypes = document.getElementsByClassName("methodReturnTypeItem");
	const methodsArray = [];
	
	for(let i = 0; i < methodModifiers.length; i++){
		if(methodNames[i].value != ""){
			if(methodReturnTypes[i].value == "")
				methodsArray.push([methodModifiers[i].value, "void", methodNames[i].value]);
			else
				methodsArray.push([methodModifiers[i].value, methodReturnTypes[i].value, methodNames[i].value]);
		}
	}
	
	list.add(classType.value, className.value, superClassName.value, superClassType.value, methodsArray);
	refreshValues();
}

function addMethod(){
	methodsTable.innerHTML += "<tr><td><select class = 'control methodModifierItem'><option>public</option><option>protected</option><option>private</option></select></td><td><input type = 'text' class = 'control methodReturnTypeItem' placeholder = 'return type' /></td><td><input type = 'text' class = 'control methodNameItem' placeholder = 'method name' /></td></tr>"
}

function removeClass(className){
	list.remove(className);
	refreshValues();
}

function refreshValues(){
	addedValues.innerHTML = "";

	var iterator = new ClassValueListIterator(list);
	
	while(iterator.next()){
		var item = "";
		item += "<div class = 'addedValueItem' onClick = \"removeClass(\'" + iterator.get().className + "\')\">Class type: " + iterator.get().classType + "<br>Class name: " + iterator.get().className;
		if(iterator.get().superClassName != "")
			item += "<br>Super class name: " + iterator.get().superClassName  + "<br>Super class type: " + iterator.get().superClassType;
		item += "</div><br>";
		addedValues.innerHTML += item;
	}
}

function exportStruct(){
	exportedStruct.innerHTML = ec.exportStruct();
}

function changeClassProgrammingLanguage(language){
	ec.changeProgrammingLanguage(language);
}