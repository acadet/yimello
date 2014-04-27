module.exports = function (grunt) {

    // load the task 
    grunt.loadNpmTasks("grunt-ts");

    // Configure grunt here
    grunt.initConfig({
	    ts: {
	        // A specific target
	        build: {
	            // The source TypeScript files, http://gruntjs.com/configuring-tasks#files
	            src: ["src/**/*.ts"],
	            // The source html files, https://github.com/grunt-ts/grunt-ts#html-2-typescript-support   
	            html: false, 
	            // If specified, generate this file that to can use for reference management
	            reference: 'src/dependencies.ts',  
	            // If specified, generate an out.js file which is the merged js file
	            out: 'js/output.js',
	            // If specified, the generate JavaScript files are placed here. Only works if out is not specified
	            outDir: 'js',
	            // If specified, watches this directory for changes, and re-runs the current target
	            watch: 'src',                     
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
	        dist: {                               
	            src: ["test/work/**/*.ts"],
	            // Override the main options for this target
	            options: {
	                sourceMap: false,
	            }
	        },
	    },
	});

	grunt.registerTask('default', ['ts:build']);
};