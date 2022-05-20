list.add("interface", "IShape", "", "", [["public", "int", "calculate"], ["private", "string", "shapeName"]]);
list.add("class", "Circle", "IShape", "interface", [["public", "int", "calculate"], ["private", "string", "shapeName"]]);
list.add("class", "Rectangle", "IShape", "interface", [["public", "int", "calculate"], ["private", "string", "shapeName"]]);
list.add("class", "Square", "Rectangle", "class", [["public", "int", "calculate"], ["private", "string", "shapeName"]]);
refreshValues();
exportClass();