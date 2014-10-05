require.config({
	baseUrl : 'js',
	paths : {
		'jquery' : 'libs/jquery.1.10.2',
		'jqueryUI' : 'libs/jquery-ui-1.10.4.min',
		'jqueryClickout' : 'libs/jquery.clickout'
	},
	shim : {
		'jquery' : {
			exports: 'jQuery'
		},
		'jqueryUI' : {
			deps : [ 'jquery' ]
		},
		'jqueryClickout' : {
			deps : [ 'jquery' ]
		}
	}
});

require(_libs, function() {
	require(['output'], function() {
		var _bootClass = eval('new ' + _mainClass + '()');
		_bootClass.onStart();
	});
});