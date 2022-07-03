class ClassValue{
	constructor(classType, className, superClassName, superClassType, methods){
		this.classType = classType;
		this.className = className;
		this.superClassName = superClassName;
		this.superClassType = superClassType;
		this.methods = methods;
		this.next = null;
	}
	
	//add new class value
	add(classType, className, superClassName, superClassType, methods){
		if(!this.isExist(className)){
			if(this.next == null){
				this.next = new ClassValue(classType, className, superClassName, superClassType, methods);
			}
			else{
				this.next.add(classType, className, superClassName, superClassType, methods);
			}
		}
	}
	
	//remove added class value
	remove(className){
		if(this.next != null){
			if(this.next.className == className)
				this.next = this.next.next;
			else{
				this.next.remove(className);
			}
		}
	}
	
	//return true if class value is exist in list
	isExist(className){
		if(this.next != null){
			if(this.next.className == className){
				return true;
			}
			if(this.next.isExist(className)){
				return true;
			}
		}

		return false;
	}


	get(className){
		if(this.next != null){
			if(this.next.className == className)
				return this.next;
			else{
				return this.next.get(className);
			}
		}
	}
}