var list = new ClassValue();
var version = "2.0.0";
document.getElementById("versionTxt").innerHTML = "version " + version;
let methodCounter = 0;

//form elements
var addedValues = document.getElementById("addedValuesDiv");
var classType = document.getElementById("classType");
var className = document.getElementById("className");
var superClassName = document.getElementById("superClassName");
var programmingLanguage = document.getElementById("programmingLanguage");

//div and table
var methodsTable = document.getElementById("methodsTable");
var exportedStruct = document.getElementById("exportedStruct");
var exportCanvas = document.getElementById("diagram-canvas");
exportCanvas.setAttribute('width', window.innerWidth * 0.8);
exportCanvas.setAttribute('height', window.innerHeight * 0.8);
var canvasContext = exportCanvas.getContext("2d");

var ec = new ExportClass(list);
ec.changeProgrammingLanguage(new JavaExporter());
programmingLanguage.addEventListener("change", function(event) {
	changeClassProgrammingLanguage(eval(programmingLanguage.value));
});

class Size{
	constructor(){
		this.w = 0;
		this.h = 0;
	}
	reset(){
		this.w = 0;
		this.h = 0;
	}
}

let canvasSize = new Size();

//add new class node to list
function addClass(){
	methodModifiers = document.getElementsByClassName("methodModifierItem");
	methodNames = document.getElementsByClassName("methodNameItem");
	methodReturnTypes = document.getElementsByClassName("methodReturnTypeItem");
	const methodsArray = [];
	
	for(let i = 0; i < methodModifiers.length; i++){
		if(methodNames[i].value != ""){
			if(methodReturnTypes[i].value == ""){
				methodsArray.push([methodModifiers[i].value, "void", methodNames[i].value]);
			}
			else{
				methodsArray.push([methodModifiers[i].value, methodReturnTypes[i].value, methodNames[i].value]);
			}
		}
	}
	methodCounter = 0;
	list.add(classType.value, className.value, superClassName.value, superClassName.value == "" ? "" : list.get(superClassName.value).classType, methodsArray);
	refreshValues();
	resetAll();
}

function copyToClipboard(){
	let structValue = exportedStruct.innerText;
	structValue.replace("&nbsp;", " ");
	structValue.replace("<br>", "\n");

	navigator.clipboard.writeText(structValue);
}

//add method element
function addMethod(){
	methodsTable.innerHTML += "<tr class = \"methodRowItem\"><td onClick = \"removeMethod(" + methodCounter + ")\">X</td><td><select class = 'control methodModifierItem'><option>public</option><option>protected</option><option>private</option></select></td><td><input type = 'text' class = 'control methodReturnTypeItem' placeholder = 'return type' /></td><td><input type = 'text' class = 'control methodNameItem' placeholder = 'method name' /></td></tr>";
	methodCounter++;
}

//remove method element
function removeMethod(id){
	document.getElementsByClassName("methodRowItem")[id].innerHTML = "";
}

//remove class value
function removeClass(className){
	list.remove(className);
	let iterator = new ClassValueListIterator(list);
	while(iterator.next()){
		if(iterator.get().superClassName == className){
			list.remove(iterator.get().className);
		}
	}
	refreshValues();
}

//refresh class values
function refreshValues(){
	addedValues.innerHTML = "";

	let iterator = new ClassValueListIterator(list);
	
	while(iterator.next()){
		var item = "";
		item += "<div class = 'addedValueItem' onClick = \"removeClass(\'" + iterator.get().className + "\')\">Class type: " + iterator.get().classType + "<br>Class name: " + iterator.get().className;
		if(iterator.get().superClassName != ""){
			item += "<br>Super class name: " + iterator.get().superClassName  + "<br>Super class type: " + iterator.get().superClassType;
		}
		item += "</div><br>";
		addedValues.innerHTML += item;
	}
	
	refreshSuperClassNames();
}

//export code struct
function exportStruct(){
	exportedStruct.innerHTML = ec.exportStruct();
}

//export visual diagram
function exportDiagram(){
	let iterator = new ClassValueListIterator(list);
	let x = 30;
	let y = 50;
	canvasContext.fillStyle = "#333333";
	canvasContext.fillRect(0, 0, window.innerWidth * 0.8, window.innerHeight * 0.8);
	
	while(iterator.next()){
		if(iterator.get().superClassName == ""){
			calculateCanvasSize(iterator.get(), x, y + 200);
		}
	}
	exportCanvas.setAttribute('width', canvasSize.w);
	exportCanvas.setAttribute('height', canvasSize.h + 200);
	console.log(canvasSize);
	canvasSize.reset();
	iterator.resetList();
	while(iterator.next()){
		if(iterator.get().superClassName == ""){
			drawToCanvas(iterator.get(), x, y);
			x = drawDiagram(iterator.get(), x, y);
		}
	}
}

function drawDiagram(class_value, _x, _y){
	let iterator = new ClassValueListIterator(list);
	let x = _x;
	let y = _y + 200;
	let counter = 0;

	while(iterator.next()){
		if(iterator.get().superClassName == class_value.className){
			drawToCanvas(iterator.get(), x, y);
			canvasContext.strokeStyle = "#FFFFFF";
			canvasContext.beginPath();
			canvasContext.moveTo(x + 100, y - 20);
			canvasContext.lineTo(x + 100, y - 50 - 20);
			canvasContext.lineTo(_x + 100, y - 50 - 20);
			canvasContext.lineTo(_x + 100, _y + class_value.methods.length * 20 + 52);
			canvasContext.stroke();
			x = drawDiagram(iterator.get(), x, y) + 200;
			counter++;
		}
	}
	
	return x;
}

function calculateCanvasSize(class_value, _x, _y){
	let iterator = new ClassValueListIterator(list);
	let x = _x;
	let y = _y;
	let counter = 0;

	while(iterator.next()){
		if(iterator.get().superClassName == class_value.className){
			x = calculateCanvasSize(iterator.get(), x, y + 200) + 200;
			counter++;
		}
	}
	
	if(canvasSize.w < x)
		canvasSize.w = x;
	if(canvasSize.h < counter * 200)
		canvasSize.h = counter * 200;

	return x;
}

//this function draws a class rect to canvas
function drawToCanvas(class_value, x, y){
	canvasContext.fillStyle = "#FFFFFF";
	canvasContext.font = "14px Arial";
	canvasContext.beginPath();
	canvasContext.strokeStyle = "#FFFFFF";
	canvasContext.rect(x - 5, y - 20, 195, (class_value.methods.length + 2) * 28);
	canvasContext.stroke();
	canvasContext.fillText(class_value.className, x, y);

	canvasContext.beginPath();
	canvasContext.moveTo(x - 5, y + 5);
	canvasContext.lineTo(x + 190, y + 5);
	canvasContext.stroke();

	y += 20;

	canvasContext.beginPath();
	canvasContext.moveTo(x - 5, y + 5);
	canvasContext.lineTo(x + 190, y + 5);
	canvasContext.stroke();
	
	y += 20;

	class_value.methods.forEach(element => {
		canvasContext.fillText((element[0] == "public" ? "+" : "-") + element[2] + "():" + element[1], x, y);
		y += 20;

	});
	canvasContext.fillText("+" + class_value.className + "()", x, y);
}

//change class programming language
function changeClassProgrammingLanguage(language){
	ec.changeProgrammingLanguage(language);
}


function refreshSuperClassNames(){
	superClassName.innerHTML = "<option value = \"\"></option>";

	let iterator = new ClassValueListIterator(list);
	
	while(iterator.next()){
		var item = "";
		item += "<option value = \"" + iterator.get().className + "\">" + iterator.get().className + "</option>";
		superClassName.innerHTML += item;
	}
}

//reset all form elements
function resetAll(){
	methodsTable.innerHTML = "";
	classType.value = "class";
	className.value = "";
	superClassName.value = "";
}