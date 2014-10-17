module.exports = function (grunt) {
	var pkg; 
	var version;

	try {
		pkg = require('./release/src/package.json');
		version = pkg.version;
	} catch (e) {
		console.log('Failed to load pkg');
	}

    // load the task 
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    //grunt.loadNpmTasks("grunt-csscomb");
    grunt.loadNpmTasks("grunt-mkdir");
    grunt.loadNpmTasks("grunt-node-webkit-builder");
    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-zip");

    // Configure grunt here
    grunt.initConfig({
    	clean : {
    		build : [
    			'tscommand-*.txt'
    		],
    		release : [
    			'release/src/app',
    			'release/releases'
	    	]
    	},
    	copy : {
			release : {
				src : 'app/ui/**/*',
				dest : 'release/src/'
			}
	    },
	    // csscomb : {
	    // 	release : {
	    // 		options : {
					// config : 'csscomb-config.json'
	    // 		},    			
    	// 		expand : true,
    	// 		cwd : 'app/ui/assets/',
    	// 		src : ['**/*.scss'],
    	// 		dest : 'app/ui/assets/'
	    // 	}
	    // },
	    mkdir : {
	    	release : {
	    		mode : 0700,
	    		create : ['release/src/app']
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
	    },
	    shell : {
	    	testing : {
    			command : [
    				'cd testing',
    				'python buildLauncher.py out/output.js src 1 5000 false'
    			].join('&&')
	    	}
	    },
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
	        },
	        testing: {                               
	            src: ["testing/src/**/*.ts"],
	            html: false, 
	            reference: 'testing/src/references.ts',  
	            out: 'testing/out/output.js',
	            outDir: false,
	            watch: false,                     
	            options: {     
	                target: 'es3',   
	                module: 'commonjs',
	                sourceMap: false,
	                declaration: false,
	                removeComments: true
	            },
	        }
	    },
	    uglify: {
			release: {
				options : {
					compress : true,
					mangle : false,
					preserveComments : false
				},
				files: {
					'release/src/app/ui/js/output.js' : ['release/src/app/ui/js/output.js']
				}
			}
		},
    	watch : {
    		build : {
    			files : 'app/**/*.ts',
    			tasks : ['ts:build', 'clean:build'],
    			options : {
    				interrupt : true,
    				atBegin : true
    			}
    		},
    		testing : {
    			files : ['**/*.ts'],
    			tasks : ['ts:testing', 'shell:testing', 'clean:build'],
    			options : {
    				interrupt : true,
    				atBegin : true
    			}
    		}
    	},
	    zip : {
	    	releaseWin : {
	    		cwd : 'release/releases/Yimello/win/',
	    		src : ['release/releases/Yimello/win/**/*'],
	    		dest : 'release/releases/yimello-win-' + version + '.zip',
	    		compression : 'DEFLATE'
	    	},
	    	releaseMac : {
	    		cwd : 'release/releases/Yimello/mac/',
	    		src : ['release/releases/Yimello/mac/**/*'],
	    		dest : 'release/releases/yimello-mac-' + version + '.zip',
	    		compression : 'DEFLATE'
	    	},
	    	releaseLinux32 : {
	    		cwd : 'release/releases/Yimello/linux32/',
	    		src : ['release/releases/Yimello/linux32/**/*'],
	    		dest : 'release/releases/yimello-linux-32-' + version + '.zip',
	    		compression : 'DEFLATE'
	    	},
	    	releaseLinux64 : {
	    		cwd : 'release/releases/Yimello/linux64/',
	    		src : ['release/releases/Yimello/linux64/**/*'],
	    		dest : 'release/releases/yimello-linux-64-' + version + '.zip',
	    		compression : 'DEFLATE'
	    	}
	    }
	});

	grunt.registerTask('build', ['watch:build']);
	grunt.registerTask('testing', ['watch:testing']);
	grunt.registerTask(
		'release',
		[
			'clean:release', 
			'ts:build',
			'mkdir:release',
			'copy:release',
			'uglify:release',
			'nodewebkit',
			'zip:releaseWin',
			'zip:releaseMac',
			'zip:releaseLinux32',
			'zip:releaseLinux64'
		]
	);
};