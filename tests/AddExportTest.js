//add to list
list.add("interface", "IShape", "", "", [["public", "float", "calculateArea"], ["private", "float", "calculatePerimeter"]]);
list.add("class", "Circle", "IShape", "interface", [["public", "float", "calculateArea"], ["private", "float", "calculatePerimeter"]]);
list.add("class", "Rectangle", "IShape", "interface", [["public", "float", "calculateArea"], ["private", "float", "calculatePerimeter"]]);
list.add("class", "Square", "Rectangle", "class", [["public", "float", "calculateArea"], ["private", "float", "calculatePerimeter"]]);

//refresh and export
refreshValues();
exportStruct();