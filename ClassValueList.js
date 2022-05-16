class ClassValueList{
	constructor(){
		this.next = null;
	}
	
	add(classValue){
		if(this.next == null)
			this.next = classValue;
		else
			this.next.add(classValue);
	}
}