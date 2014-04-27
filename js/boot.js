_libs.push('output');

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

require(_libs, function() {
	var _bootClass = eval('new ' + _mainClass + '()');
});