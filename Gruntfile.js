module.exports = function (grunt) {
    const sass = require('node-sass');
    grunt.initConfig({
        package: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                implementation: sass,
            },
            dist: {
                files: {
                    'src/css/styles.css': 'src/css/scss/main.scss'
                }
            }
        },
        ts: {
            default : {
                tsconfig: './tsconfig.json'
            }
        },
        uglify: {
            jsUglifyAll: {
                files: [
                    {
                        'dist/js/main.min.js': 'dist/js/main.js'
                    }
                ]
            }
        },
        cssmin: {
            target: {
                files: {
                    'dist/css/styles.min.css': ['src/css/*.css']
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 10 versions', 'ie 8', 'ie 9']
            },
            target: {
                files: {
                    'src/css/styles.css': 'src/css/styles.css'
                }
            },
        },
        watch: {
            files: ['*.html', 'html/*.html', 'src/js/*.ts', 'src/css/scss/*.scss', 'src/css/scss/*/*.scss', 'src/css/scss/*/*/*.scss'],
            tasks: ['sass', 'autoprefixer', 'cssmin', 'ts', 'uglify'],
            options: {
                livereload:true
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: {
                        path: './',
                        options: {
                            index: 'index.html'
                        }
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks("grunt-ts");

    grunt.registerTask('prod', ['sass', 'autoprefixer', 'cssmin', 'ts', 'uglify']);
    grunt.registerTask('default', ['connect', 'watch']);
};

