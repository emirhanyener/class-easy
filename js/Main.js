var list = new ClassValue();
var version = "1.2.0";
document.getElementById("versionTxt").innerHTML = "version " + version;

//form elements
var addedValues = document.getElementById("addedValuesDiv");
var classType = document.getElementById("classType");
var className = document.getElementById("className");
var superClassName = document.getElementById("superClassName");
var superClassType = document.getElementById("superClassType");
var programmingLanguage = document.getElementById("programmingLanguage");

//div and table
var methodsTable = document.getElementById("methodsTable");
var exportedStruct = document.getElementById("exportedStruct");

var ec = new ExportClass(list);
ec.changeProgrammingLanguage(new JavaExporter());
programmingLanguage.addEventListener("change", function(event) {
	changeClassProgrammingLanguage(eval(programmingLanguage.value));
});

//add new class node to list
function addClass(){
	methodModifiers = document.getElementsByClassName("methodModifierItem");
	methodNames = document.getElementsByClassName("methodNameItem");
	methodReturnTypes = document.getElementsByClassName("methodReturnTypeItem");
	const methodsArray = [];
	
	for(let i = 0; i < methodModifiers.length; i++){
		if(methodNames[i].value != ""){
			if(methodReturnTypes[i].value == ""){
				methodsArray.push([methodModifiers[i].value, "void", methodNames[i].value]);
			}
			else{
				methodsArray.push([methodModifiers[i].value, methodReturnTypes[i].value, methodNames[i].value]);
			}
		}
	}
	
	list.add(classType.value, className.value, superClassName.value, superClassType.value, methodsArray);
	refreshValues();
}

function copyToClipboard(){
	let structValue = exportedStruct.innerText;
	structValue.replace("&nbsp;", " ");
	structValue.replace("<br>", "\n");

	navigator.clipboard.writeText(structValue);
}

//create method elements
function addMethod(){
	methodsTable.innerHTML += "<tr><td><select class = 'control methodModifierItem'><option>public</option><option>protected</option><option>private</option></select></td><td><input type = 'text' class = 'control methodReturnTypeItem' placeholder = 'return type' /></td><td><input type = 'text' class = 'control methodNameItem' placeholder = 'method name' /></td></tr>";
}

//remove class value
function removeClass(className){
	list.remove(className);
	let iterator = new ClassValueListIterator(list);
	while(iterator.next()){
		if(iterator.get().superClassName == className){
			list.remove(iterator.get().className);
		}
	}
	refreshValues();
}

//refresh class values
function refreshValues(){
	addedValues.innerHTML = "";

	let iterator = new ClassValueListIterator(list);
	
	while(iterator.next()){
		var item = "";
		item += "<div class = 'addedValueItem' onClick = \"removeClass(\'" + iterator.get().className + "\')\">Class type: " + iterator.get().classType + "<br>Class name: " + iterator.get().className;
		if(iterator.get().superClassName != ""){
			item += "<br>Super class name: " + iterator.get().superClassName  + "<br>Super class type: " + iterator.get().superClassType;
		}
		item += "</div><br>";
		addedValues.innerHTML += item;
	}
	
	refreshSuperClassNames();
}

//export code struct
function exportStruct(){
	exportedStruct.innerHTML = ec.exportStruct();
}

//change class programming language
function changeClassProgrammingLanguage(language){
	ec.changeProgrammingLanguage(language);
}

function refreshSuperClassNames(){
	superClassName.innerHTML = "<option value = \"\"></option>";

	let iterator = new ClassValueListIterator(list);
	
	while(iterator.next()){
		var item = "";
		item += "<option value = \"" + iterator.get().className + "\">" + iterator.get().className + "</option>";
		superClassName.innerHTML += item;
	}
}