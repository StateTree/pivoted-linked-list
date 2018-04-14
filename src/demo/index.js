import PivotedLinkedList from  "./../lib";


const list = new PivotedLinkedList([4,7,9,10]);

function print(){
	console.log(list.toArray());
}

print();
list.insert(33);
print();

list.shiftPivotToHead();
list.insert(0);
print();

list.shiftPivotToTail();
list.insert(0);
print();

list.shiftPivot(-4);
list.insert(0);
print();

console.log(list.next());

list.shiftPivot(2);
list.insert(22);
print();
