var list = new ClassValue();
list.add("class", "asdclass1", "testsuper1");
list.add("class", "asdclass2", "testsuper2");
function classAdd(){
	var classType = document.getElementById("classType");
	var className = document.getElementById("className");
	var superClassName = document.getElementById("superClassName");
	
	list.add(classType.value, className.value, superClassName.value);
	
	var values = document.getElementById("values");
	values.innerHTML += classType.value + " " + className.value + " extends " + superClassName.value + "<br>";
}
function refreshValues(){
	values.innerHTML = "values <br>";
	var iterator = new ClassValueListIterator(list);
	
	while(iterator.next()){
		values.innerHTML += iterator.get().classType + " " + iterator.get().className + " extends " + iterator.get().superClassName + "<br>";3
	}
	
}