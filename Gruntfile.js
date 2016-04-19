module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			task: {
				src: ['js/jquery_2_2.js', 'js/velocity.js', 'js/script.js'], 
				dest: 'js/bundle.js'
			},
			options: {
				'separator': grunt.util.linefeed,
				'banner': '',
				'footer': '',
				'stripBanners': false,
				'process': false,
				'sourceMap': false,
				'sourceMapName': undefined,
				'sourceMapStyle': 'embed'
			}
		},
		uglify: {
			task: {
				src: ['js/bundle.js'], 
				dest: 'js/bundle.js'
			},
			options: {
				'mangle': {},
				'compress': {},
				'beautify': false,
				'expression': false,
				'report': 'min',
				'sourceMap': false,
				'sourceMapName': undefined,
				'sourceMapIn': undefined,
				'sourceMapIncludeSources': false,
				'enclose': undefined,
				'wrap': undefined,
				'exportAll': false,
				'preserveComments': undefined,
				'banner': '',
				'footer': ''
			}
		},
		clean: {
			task: {
				src: ['source'], 
				dest: 'destination'
			},
			options: {
				'force': false,
				'no-write': false
			}
		},
		sass: {
			task: {
				src: ['sass/site.scss'], 
				dest: 'css/style.css'
			},
			options: {
				'sourcemap': 'auto',
				'trace': false,
				'unixNewlines': false,
				'check': false,
				'style': 'nested',
				'precision': 3,
				'quiet': false,
				'compass': false,
				'debugInfo': false,
				'lineNumbers': false,
				'loadPath': [],
				'require': [],
				'cacheLocation': '.sass-cache',
				'noCache': false,
				'bundleExec': false,
				'update': false
			}
		},
		watch: {
            src: {
              options:{
              	livereload:{
			        host: 'localhost',
			        port: 80
			    }
  			  },
              files: ['sass/*.scss'], 
              tasks: ['sass']
            },
        }
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['clean', 'concat', 'uglify']);
	grunt.registerTask('go', ['watch']);
	
};