module.exports = function (grunt) {

    // load the task 
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-copy");

    // Configure grunt here
    grunt.initConfig({
	    ts: {
	        // A specific target
	        build: {
	            // The source TypeScript files, http://gruntjs.com/configuring-tasks#files
	            src: ["app/**/*.ts"],
	            // The source html files, https://github.com/grunt-ts/grunt-ts#html-2-typescript-support   
	            html: false, 
	            // If specified, generate this file that to can use for reference management
	            reference: 'app/dependencies.ts',  
	            // If specified, generate an out.js file which is the merged js file
	            out: 'app/ui/js/output.js',
	            // If specified, the generate JavaScript files are placed here. Only works if out is not specified
	            outDir: false,
	            // If specified, watches this directory for changes, and re-runs the current target
	            watch: 'app',                     
	            // Use to override the default options, http://gruntjs.com/configuring-tasks#options
	            options: {     
	                // 'es3' (default) | 'es5'
	                target: 'es3',
	                // 'amd' (default) | 'commonjs'    
	                module: 'commonjs',
	                // true (default) | false
	                sourceMap: false,
	                // true | false (default)
	                declaration: false,
	                // true (default) | false
	                removeComments: true
	            },
	        },
	        // Another target
	        testing: {                               
	            // The source TypeScript files, http://gruntjs.com/configuring-tasks#files
	            src: ["testing/**/*.ts"],
	            // The source html files, https://github.com/grunt-ts/grunt-ts#html-2-typescript-support   
	            html: false, 
	            // If specified, generate this file that to can use for reference management
	            reference: 'testing/test_dependencies.ts',  
	            // If specified, generate an out.js file which is the merged js file
	            out: 'testing/output/test_output.js',
	            // If specified, the generate JavaScript files are placed here. Only works if out is not specified
	            outDir: false,
	            // If specified, watches this directory for changes, and re-runs the current target
	            watch: '.',                     
	            // Use to override the default options, http://gruntjs.com/configuring-tasks#options
	            options: {     
	                // 'es3' (default) | 'es5'
	                target: 'es3',
	                // 'amd' (default) | 'commonjs'    
	                module: 'commonjs',
	                // true (default) | false
	                sourceMap: false,
	                // true | false (default)
	                declaration: false,
	                // true (default) | false
	                removeComments: true
	            },
	        },
	    },
	    copy : {
	    	appDependencies : {
	    		src : 'app/dependencies.ts',
	    		dest : 'testing/app_dependencies.ts',
	    		options : {
					process : function(content, srcpath) {
						return content.replace(/\<reference path=\"(.+\.ts)\" \/\>/gi, '<reference path="../app/$1" />');
					}
				}
			}
	    }
	});

	grunt.registerTask('build', ['ts:build']);
	grunt.registerTask('testing', ['copy:appDependencies', 'ts:testing']);
};