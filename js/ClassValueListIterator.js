class ClassValueListIterator{
	constructor(_list){
		this.first = _list;
		this.list = _list;
	}
	
	//new node in list
	next(){
		if(this.list.next != null){
			this.list = this.list.next;
			return true;
		}
		return false;
	}
	
	//current node in list
	get(){
		return this.list;
	}
	
	//set first node
	resetList(){
		this.list = this.first;
	}
}