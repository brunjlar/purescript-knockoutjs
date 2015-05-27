module.exports = function(grunt) {
    "use strict";
    grunt.initConfig({
        srcFiles: ["src/**/*.purs", "bower_components/**/src/**/*.purs"],
        psc: {
            options: {
                modules: ["Hello"]
            },
            all: {
                src: ["<%=srcFiles%>"],
                dest: "html/hello.js"
            }
        },
        dotPsci: ["<%=srcFiles%>"]
    });
    grunt.loadNpmTasks("grunt-purescript");
    grunt.registerTask("default", ["psc:all", "dotPsci"]);
};