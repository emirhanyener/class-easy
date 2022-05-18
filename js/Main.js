var list = new ClassValue();
var values = document.getElementById("values");
var classType = document.getElementById("classType");
var className = document.getElementById("className");
var superClassName = document.getElementById("superClassName");

function classAdd(){
	list.add(classType.value, className.value, superClassName.value);
	refreshValues();
}

function classRemove(className){
	list.remove(className);
	refreshValues();
}

function refreshValues(){
	values.innerHTML = "";
	var iterator = new ClassValueListIterator(list);
	
	while(iterator.next()){
		values.innerHTML += "<div onClick = \"classRemove(\'" + iterator.get().className + "\')\">" + iterator.get().classType + " " + iterator.get().className + " extends " + iterator.get().superClassName + "</div><br>";
	}
}