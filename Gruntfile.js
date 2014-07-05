module.exports = function (grunt) {

    // load the task 
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-remove");
    grunt.loadNpmTasks("grunt-mkdir");
    grunt.loadNpmTasks("grunt-zip");
    grunt.loadNpmTasks("grunt-node-webkit-builder");

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
	        release: {
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
	            watch: false,                     
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
	        }
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
			},
			release : {
				src : 'app/ui/**/*',
				dest : 'release/src/'
			}
	    },
	    mkdir : {
	    	release : {
	    		mode : 0700,
	    		create : ['release/src/app']
	    	}
	    },
	    remove : {
	    	options : {
	    		trace : true
	    	},
	    	release : {
	    		fileList : [
	    			'release/releases/yimello-win.zip', 
	    			'release/releases/yimello-mac.zip',
	    			'release/releases/yimello-linux-32.zip',
	    			'release/releases/yimello-linux-64.zip'
	    		],
	    		dirList : ['release/src/app', 'release/releases']
	    	}
	    },
	    zip : {
	    	releaseWin : {
	    		cwd : 'release/releases/Yimello/win/',
	    		src : ['release/releases/Yimello/win/**/*'],
	    		dest : 'release/releases/yimello-win.zip',
	    		compression : 'DEFLATE'
	    	},
	    	releaseMac : {
	    		cwd : 'release/releases/Yimello/mac/',
	    		src : ['release/releases/Yimello/mac/**/*'],
	    		dest : 'release/releases/yimello-mac.zip',
	    		compression : 'DEFLATE'
	    	},
	    	releaseLinux32 : {
	    		cwd : 'release/releases/Yimello/linux32/',
	    		src : ['release/releases/Yimello/linux32/**/*'],
	    		dest : 'release/releases/yimello-linux-32.zip',
	    		compression : 'DEFLATE'
	    	},
	    	releaseLinux64 : {
	    		cwd : 'release/releases/Yimello/linux64/',
	    		src : ['release/releases/Yimello/linux64/**/*'],
	    		dest : 'release/releases/yimello-linux-64.zip',
	    		compression : 'DEFLATE'
	    	}
	    },
	    nodewebkit : {
	    	options : {
	    		build_dir : 'release',
	    		mac : true,
	    		win : true,
	    		linux32 : true,
	    		linux64 : true,
	    		mac_icns : 'release/src/logo.icns'
	    	},
	    	src : ['release/src/**/*']
	    }
	});

	grunt.registerTask('build', ['ts:build']);
	grunt.registerTask('testing', ['copy:appDependencies', 'ts:testing']);
	grunt.registerTask(
		'release',
		[
			'remove:release', 
			'ts:release',
			'mkdir:release',
			'copy:release',
			'nodewebkit',
			'zip:releaseWin',
			'zip:releaseMac',
			'zip:releaseLinux32',
			'zip:releaseLinux64'
		]
	);
};