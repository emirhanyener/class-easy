function test(){
    //values
    list.add("interface", "IShape", "", "", [["public", "float", "calculateArea"], ["private", "float", "calculatePerimeter"]]);
    list.add("class", "Circle", "IShape", "interface", [["public", "float", "calculateArea"], ["private", "float", "calculatePerimeter"]]);
    list.add("class", "Rectangle", "IShape", "interface", [["public", "float", "calculateArea"], ["private", "float", "calculatePerimeter"]]);
    list.add("class", "Square", "Rectangle", "class", [["public", "float", "calculateArea"], ["private", "float", "calculatePerimeter"]]);
    list.add("class", "a", "Circle", "class", [["public", "float", "calculateArea"], ["private", "float", "calculatePerimeter"]]);
    list.add("class", "b", "Circle", "class", [["public", "float", "calculateArea"], ["private", "float", "calculatePerimeter"]]);

    //refresh
    refreshValues();

    //test
    exportStruct();
    changeClassProgrammingLanguage(new CPlusPlusExporter());
    exportStruct();
    console.log("c++ success");
    changeClassProgrammingLanguage(new CSharpExporter());
    exportStruct();
    console.log("c# success");
    changeClassProgrammingLanguage(new PythonExporter());
    exportStruct();
    console.log("python success");
    changeClassProgrammingLanguage(new PHPExporter());
    exportStruct();
    console.log("php success");
    changeClassProgrammingLanguage(new RubyExporter());
    exportStruct();
    console.log("ruby success");
    changeClassProgrammingLanguage(new JavaExporter());
    exportStruct();
    console.log("java success");
    exportDiagram();

    alert("test success");
}