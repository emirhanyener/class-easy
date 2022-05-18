class ClassValue{
	constructor(classType, className, superClassName){
		this.classType = classType;
		this.className = className;
		this.superClassName = superClassName;
		this.next = null;
	}
	
	add(classType, className, superClassName){
		if(this.next == null){
			this.next = new ClassValue(classType, className, superClassName);
		}
		else{
			this.next.add(classType, className, superClassName);
		}
	}
}