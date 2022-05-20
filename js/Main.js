var list = new ClassValue();

var values = document.getElementById("addedValues");
var classType = document.getElementById("classType");
var className = document.getElementById("className");
var superClassName = document.getElementById("superClassName");
var superClassType = document.getElementById("superClassType");

var methods = document.getElementById("methods");

var exportedClass = document.getElementById("exportedClass");
var exportLanguage = document.getElementById("exportLanguage");
var ec = new ExportClass(list);
ec.changeLanguage(new JavaExporter());

exportLanguage.addEventListener("change", function(event) {
	changeClassLanguage(eval(exportLanguage.value));
});

function classAdd(){
	methodModifiers = document.getElementsByClassName("methodModifierItem");
	methodNames = document.getElementsByClassName("methodNameItem");
	const methodsArray = [];
	
	for(let i = 0; i < methodModifiers.length; i++){
		methodsArray.push([methodModifiers[i].value, methodNames[i].value]);
	}
	
	list.add(classType.value, className.value, superClassName.value, superClassType.value, methodsArray);
	refreshValues();
}
function methodAdd(){
	methods.innerHTML += "<tr><td><select class = 'control methodModifierItem'><option>public</option><option>protected</option><option>private</option></select></td><td><input type = 'text' class = 'control methodNameItem' placeholder = 'method name' /></td></tr>"
}

function classRemove(className){
	list.remove(className);
	refreshValues();
}

function refreshValues(){
	values.innerHTML = "";
	var iterator = new ClassValueListIterator(list);
	
	while(iterator.next()){
		var item = "";
		item += "<div class = 'addedValueItem' onClick = \"classRemove(\'" + iterator.get().className + "\')\">Class type: " + iterator.get().classType + "<br>Class name: " + iterator.get().className;
		if(iterator.get().superClassName != "")
			item += "<br>Super class name: " + iterator.get().superClassName  + "<br>Super class type: " + iterator.get().superClassType + "</div><br><br>";
		else
			item += "</div><br><br>";
		values.innerHTML += item;
	}
}

function exportClass(){
	exportedClass.innerHTML = ec.exportClass();
}
function changeClassLanguage(language){
	ec.changeLanguage(language);
}