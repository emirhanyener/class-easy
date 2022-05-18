var list = new ClassValue();
function classAdd(){
	var classType = document.getElementById("classType");
	var className = document.getElementById("className");
	var superClassName = document.getElementById("superClassName");
	
	list.add(classType.value, className.value, superClassName.value);
	
	var values = document.getElementById("values");
	values.innerHTML += classType.value + " " + className.value + " extends " + superClassName.value + "<br>";
}
function refreshValues(){
	values.innerHTML = "";
	var iterator = new ClassValueListIterator(list);
	
	while(iterator.next()){
		values.innerHTML += iterator.get().classType + " " + iterator.get().className + " extends " + iterator.get().superClassName + "<br>";3
	}
}