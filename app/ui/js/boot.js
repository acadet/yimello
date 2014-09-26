require.config({
	baseUrl : 'js',
	paths : {
		'jquery' : 'libs/jquery.1.10.2'
	},
	shim : {
		'jquery' : {
			exports: 'jQuery'
		}
	}
});

define('jqueryUI', ['jquery'], function() {
	require(['libs/jquery-ui-1.10.4.min']);
});

define('jqueryClickout', ['jquery'], function() {
	require(['libs/jquery.clickout']);
});

require(_libs, function() {
	require(['output'], function() {
		var _bootClass = eval('new ' + _mainClass + '()');
	});
});