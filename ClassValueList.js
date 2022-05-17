class ClassValueList{
	constructor(classType, className, superClassName){
		this.next = null;
		this.last = null;
		this.classValue = new ClassValue(classType, className, superClassName);
	}
	
	add(classValue){
		if(this.last == null){
			this.last = new ClassValueList(new ClassValue(classType, className, superClassName));
		}
		else{
			this.last.next = classValue;
			this.last = classValue;
		}
	}
}