module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({

    libFiles: [
      "src/**/*.purs",
      "bower_components/purescript-*/src/**/*.purs"
    ],
    clean: ["output", "example/hello.js"],

    pscMake: ["<%=libFiles%>"],
    psc: {
        options: {
            modules: ["Hello"] 
        },
        all: {
            src: ["<%=libFiles%>", "example/Hello.purs"],
            dest: "example/hello.js"
        }
    },
    dotPsci: ["<%=libFiles%>", "example/Hello.purs"],
    pscDocs: {
        readme: {
            src: "src/**/*.purs",
            dest: "README.md"
        }
    },
    jsvalidate: {
      options: {
        globals: {},
        esprimaOptions: {},
        verbose: false
      },
      targetName: {
        files: {
          src: ["output/Control.Monad.Knockout/*.js", "example/hello.js"]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-purescript");
  grunt.loadNpmTasks("grunt-jsvalidate");

  grunt.registerTask("make", ["clean", "pscMake", "psc", "dotPsci", "pscDocs", "jsvalidate"]);
  grunt.registerTask("default", ["make"]);
};
