# gulp-display-help
Output beautiful custom help text for your gulp tasks and parameters

Display help text for your project's gulpfile.

Allows display of help text for both tasks and environment flags.



Usage

gulp.task('help', displayHelp(gulp.tasks [, descriptions, excludes, flagDescriptions])
- gulp.tasks must always be the first parameter
- descriptions is an object


Example

    var require('gulp-display-help');

    gulp.task('help', gulp.tasks, displayHelp({
    
      //tasks
      default: '1) a) compiles app: converts NodeJS --> JS & concats it' +
               'all libs into a single js file; b) compiles SCSS --> CSS;' +
               ' c)compiles html templates; d) grabs static resources; & ' +
               'e) copies everything used into build folder.\n2)backs ' +
               'project up into separate local folder. \n3) watches src ' +
               'folder for changes, & auto-recompiles when a change occurs',
                         

      'test': 'run jasmine tests, launch & test in a js runtime env with karma;',

      'backup': 'Backs up src files into a local folder',

      'help': 'displays this help text'
    
      //exclude these tasks
      }, [_copy-images', '__watch', '__copy-libs', 'compile-templates'],  {

      //gulp flags/parameters
      "--production": 'production-ready compile: same as default with a few' + 
                      ' changes: 1) 'comments, calls to js loggers, &' + 
                      ' dev-only html blocks rm; 4) production-only blocks' + 
                      ' of html uncommented; 5) css, js, & html minified; ' +
                      '  & 6) Static resources compressed.',

      '--once': 'runs the compile only once, without watching for subsequent changes'

      }));
    

Features automatic wrapping, indenting, and adjustment of definitions.

