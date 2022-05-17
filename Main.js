let classValueList = new ClassValueList();
function classAdd(){
	classType = document.getElementById("classType");
	className = document.getElementById("className");
	superClassName = document.getElementById("superClassName");
	
	classValueList.add(new ClassValue(classType.value, className.value, superClassName.value));
	
	values = document.getElementById("values");
	values.innerHTML += classType.value + " " + className.value + " extends " + superClassName.value + "<br>";
}
function refreshValues(){
	values.innerHTML = "values <br>";
	iterator = new ClassValueListIterator(classValueList);
	console.log(iterator.get().classType);
	while(true){		
		if(iterator.get() == null)
			break;
		values.innerHTML += iterator.get().classType + " " + iterator.get().className + " extends " + iterator.get().superClassName + "<br>";3
		iterator.next();
	}
}