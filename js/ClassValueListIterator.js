class ClassValueListIterator{
	constructor(_list){
		this.first = _list;
		this.list = _list;
	}
	
	next(){
		if(this.list.next != null){
			this.list = this.list.next;
			return true;
		}
		return false;
	}
	
	get(){
		return this.list;
	}
	
	resetList(){
		this.list = this.first;
	}
}