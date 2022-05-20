list.add("interface", "IShape", "", "");
list.add("class", "Circle", "IShape", "interface");
list.add("class", "Rectangle", "IShape", "interface");
list.add("class", "Square", "Rectangle", "class");
refreshValues();
exportClass();