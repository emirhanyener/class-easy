class ClassValueListIterator{
	constructor(list){
		this.list = list;
	}
	
	next(){
		list.next = list.next.next;
	}
	
	get(){
		if(this.list.next == null)
			return null;
		
		return list.next.classValue;
	}
}