# gulp-display-help
#### Output beautiful custom help text for your gulp tasks and parameters.

- Lets you make help text specific to your project's gulpfile - for both tasks and environment flags - which can then be accessed via the command line (e.g. 'gulp help').

- Automatically generates and displays list of tasks. Tasks can be excluded if not wanted on the help list ('private'/'internal' tasks). Descriptions added to each task via the plugin.

- "Usage" information displayed at the top.

- Wraps and indents the help text, linux 'man' style.

__Installation__

        npm install --save-dev gulp-display-help


## Usage

__gulp.task('help', displayHelp(gulp.tasks [, descriptions, excludes, flagDescriptions])__
- gulp.tasks must always be the first parameter.
- descriptions {Object} format: 

        { "taskname1": "taskDescription1", "taskName2": "taskDescription2", "etc": "etc"}

- excludes {Array} format: 

        ["taskToExcludeFromHelp1", "taskToExcludeFromHelp2", "item3", "item4", "etc"]

- flagDescriptions {Object} format:

        {"gulpCliParameter1": "gulpCliParameter1Description", "gulpParam2": "gulpDescription2", "etc": "etc" }


### Example

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

      //flags
      "--production": 'full production-ready compile: same as default with a few changes: 1) ' +
                'comments removed; 2) calls to js loggers removed; 3) dev-only sections of html' +
                'removed; 4) production-only blocks of html uncommented; 5) *TODO* css, js, &' +
                'html minified; & 6) Static resources compressed.',

      '--once': 'runs the compile only once, without watching for subsequent changes'

      }));
    

Features automatic wrapping, indenting, and adjustment of definitions.


