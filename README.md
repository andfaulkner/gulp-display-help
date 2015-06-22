# gulp-display-help
Output beautiful custom help text for your gulp tasks and parameters
Display help text for your project's gulpfile.

Allows display of help text for both tasks and environment flags.

##Example

    var require('gulp-display-help');

    gulp.task('help', displayHelp({
    
      //tasks
      default: '** 1) a) compiles the app: converts NodeJS --> JS & concats it + all libraries ' +
      			   'used into a single js file, b) compiles SCSS --> CSS, c) compiles the html ' +
    			     '"templates", which uncomments tags intended for development use only & ' +
    			     'generates browser & mobile index.html versions containing slightly different' +
    			     ' values; d) grabs the static resources (images, js & css libs), & e) copies' +
    			     ' everything used (from web_modules & node_modules) --> /www;;;;;", **2) Backs ' +
    			     ' source files up into a local folder - descended from the parent folder of ' +
      			   'the project root folder;;;;; & **3) Watches the source folder for changes, ' +
    			     'then automatically recompiles any time it changes (until explicitly stopped)',

      'test': 'run jasmine unit tests, launch & test in a js runtime environment using karma;',

      'gulp cordovaserve': 'Start the development server, displaying a mock of the app at localhost:3000'

      }, {

      //flags
    	"--production": 'full production-ready compile: same as default with a few changes: 1) ' +
      			'comments removed; 2) calls to js loggers removed; 3) dev-only sections of html' +
      			'removed; 4) production-only blocks of html uncommented; 5) *TODO* css, js, &' +
      			'html minified; & 6) Static resources compressed.',

      '--once': 'runs the compile only once, without watching for subsequent changes'

      }));
    

Features automatic wrapping, indenting, and adjustment of 
