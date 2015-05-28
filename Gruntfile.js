module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({

    libFiles: [
      "src/**/*.purs",
      "bower_components/purescript-*/src/**/*.purs"
    ],
    clean: ["output", "docs", "example/hello.js", "README.md"],

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
        doc: {
            src: "src/**/*.purs",
            dest: "docs/Control.Monad.Knockout.md"
        }
    },
    concat: {
        options: {
        },
        dist: {
            src: ['status.md', 'docs/Control.Monad.Knockout.md'],
            dest: 'README.md'
        },
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
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-purescript");
  grunt.loadNpmTasks("grunt-jsvalidate");

  grunt.registerTask("make", ["clean", "pscMake", "psc:all", "dotPsci", "pscDocs:doc", "concat", "jsvalidate"]);
  grunt.registerTask("default", ["make"]);
};
