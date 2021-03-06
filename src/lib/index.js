import Node from "./Node";
export default class PivotedLinkedList {
	constructor(array){
		this.pivot = null;
		this.head = null;
		this.tail = null;
		this.length = 0;
		array && this.create(array);
	}
}

PivotedLinkedList.prototype.insert = function(element, preInsert, postInsert){
	const newNode = new Node(element);
	this.length++;

	let current, next;

	if(!this.pivot){ // inserting as first element
		preInsert && preInsert(newNode);
		this.pivot = newNode;
		this.head = newNode;
		postInsert && postInsert(newNode);
	} else if(this.pivot.next){ // inserting in middle
		current = this.pivot;
		next = this.pivot.next;
		preInsert && preInsert(current,newNode,next);
		newNode.next = current.next;
		newNode.prev = current;

		current.next = newNode;
		next.prev = newNode;

		this.pivot = newNode;
		postInsert && postInsert(current,newNode,next);
	} else { // inserting as last element
		current = this.pivot;
		preInsert && preInsert(current,newNode);
		current.next = newNode;
		newNode.prev = current;

		this.pivot = newNode;
		this.tail = newNode;
		postInsert && postInsert(current,newNode);
	}

};

PivotedLinkedList.prototype.shiftPivot = function(shift){
	let current = this.pivot;

	let rightShift;
	if(shift >= 0){
		rightShift = true;
	}

	while(shift !== 0){
		if(rightShift){
			current = current.next;
			(current === this.tail) ? (shift = 0) : shift--;
		} else {
			current = current.prev;
			(current === this.head) ? (shift = 0) : shift++;
		}
	}

	this.pivot = current;

	return this.pivot;
};

PivotedLinkedList.prototype.shiftPivotToHead = function(){
	this.pivot = this.head;
};

PivotedLinkedList.prototype.shiftPivotToTail = function(){
	this.pivot = this.tail;
};

PivotedLinkedList.prototype.create = function(array){
	array.map((element)=>{
		this.insert(element);
	})
};

PivotedLinkedList.prototype.traverse = function(callback, rightToLeft){
	let current = rightToLeft ? this.tail : this.head;
	while(current){
		callback(current.element);
		current = rightToLeft ? current.prev : current.next;
	}
};


PivotedLinkedList.prototype.toArray = function(){
	const array = [];
	this.traverse((element)=>{
		array.push(element);
	})
	return array;
};

PivotedLinkedList.prototype.getPivotElement = function(){
	if(this.pivot){
		return this.pivot.element;
	}
	return null;
};

PivotedLinkedList.prototype.next = function(){
	const next = this.pivot.next ? this.pivot.next :  this.pivot;
	this.pivot = next;
	return next;
};

PivotedLinkedList.prototype.prev = function(){
	const prev = this.pivot.prev ? this.pivot.prev :  this.pivot;
	this.pivot = prev;
	return prev;
};

PivotedLinkedList.prototype.isPivotHead = function(){
	return this.pivot === this.head;
};

PivotedLinkedList.prototype.isPivotTail = function(){
	return this.pivot === this.tail;
};

PivotedLinkedList.prototype.reset = function(){
	this.pivot = null;
	this.head = null;
	this.tail = null;
	this.length = 0;
};