class ClassValue{
	constructor(classType, className, superClassName){
		this.classType = classType;
		this.className = className;
		this.superClassName = superClassName;
		this.next = null;
	}
	
	add(classType, className, superClassName){
		if(!this.isExist(className)){
			if(this.next == null){
				this.next = new ClassValue(classType, className, superClassName);
			}
			else{
				this.next.add(classType, className, superClassName);
			}
		}
	}
	
	remove(className){
		if(this.next != null){
			if(this.next.className == className)
				this.next = this.next.next;
			else{
				this.next.remove(className);
			}
		}
	}
	
	isExist(className){
		if(this.next != null){
			if(this.next.className == className)
				return true;
			if(this.next.isExist(className))
				return true;
		}
		return false;
	}
}