var chalk = require('chalk');
var gulp = require('gulp');
var sprintf = require('sprintf');
var wordWrap = require('word-wrap');

module.exports = function (descriptions, flagDescriptions) {
	
//wordWrap settings
var wrapSettings = {
		indent: '                             ', 
		width: '60' 
};

/**
 * @private
 * Check if the flagDescriptions parameter is valid
 */
var isFlagDescriptionObj = function(item){
    if (typeof item !== "undefined" && 
    	item !== null && 
    	typeof item !== 'string' && 
    	(!(Object.keys(item).length <= 0)) &&
    	typeof item === 'object')
    {
    	return (Object.keys(item)).every(function(key, index){
        	
            if (typeof key !== 'string' || typeof item[key] !== 'string'){
                return false;
            }
            return true;
        });
    }

    return false;
}

/**
 * @private
 * Handle display of tasks with descriptions spanning multiple lines
 */
var displayTaskWithDescription = function(task, prettyTaskName){
	var defStr, firstLn, rest;

	defStr = descriptions[task];
	firstLn = (defStr.slice(0, wrapSettings.width));
	rest = (defStr.slice(wrapSettings.width, defStr.length));
		
	console.log(prettyTaskName + ' - ' + firstLn);
	console.log(wordWrap(rest, wrapSettings));
			
//	//Indent and display a dash if this is a taskrunner
//	if (dep.length) {
//		console.log(indentString + '   ');
//	}		
}

/**
 * @private
 * Handle display of help text for tasks with tasklists spanning multiple lines
 */
function displayMultilineTaskList(depStr, prettyTaskName){
	var rest, firstLn, partialEndWord;
	firstLn = depStr.toString().slice(0, wrapSettings.width);
	
	if (firstLn.slice(-1).match(/[a-zA-Z0-9_]$/g) !== null) {  //determines if partial word at end
		partialEndWord = (firstLn.match(/\s[^s]*$/))[0]; 		//gets partial word at end
		firstLn = firstLn.slice(0, firstLn.length - partialEndWord.length);
		rest = partialEndWord.slice(1) + 
			   depStr.slice(wrapSettings.width, depStr.length) + '\n';

	} else {
		rest = depStr.slice(wrapSettings.width, depStr.length + '\n');
	}

	console.log(prettyTaskName + ' - ' + firstLn);
	console.log(wordWrap(rest, wrapSettings));																	
}


/**
 * @private
 * Taskrunner tasks with no description: log name, list of tasks it runs
 */
function displayNoDescriptionTask(prettyTaskName, dep, depStr){

	//display tasks with task lists & no description
	if (dep.length) {
		//Single line task list
		if (depStr.length <= wrapSettings.width){
			console.log(prettyTaskName + ' - ' + depStr + '\n');

		//Multiline tasklist
		} else {
			displayMultilineTaskList(depStr, prettyTaskName);
		}
		
	//Output task name only, if no description or task list
	} else {
		console.log(prettyTaskName + '\n');
	}
}



/**
 * @public
 * exported gulp help object
 */
return function () {
	var tasks, indent, indentString;
	descriptions = descriptions || {},
	tasks = Object.keys(gulp.tasks);

	//Show title
	console.log('\n' + chalk.bold.yellow('Registered tasks:') + '\n');

	//Determine length of indent
	indent = tasks.reduce(function (winner, current) {
		return Math.max(current.length, winner);
	}, 0);
	
	indentString = (new Array(indent+1)).join(' ');
	
	//Display the taskname and its description
	Object.keys(gulp.tasks).forEach(function (task) {
		var prettyTaskName, dep, depStr;

		//Formatting for the task's help text
		prettyTaskName = chalk.bold((task + indentString).substr(0,indent));
		dep = gulp.tasks[task].dep;

//		for (var i = 0; i < dep.length; i++) { //dep[i] = chalk.bold(dep[i]); }
		
		depStr = 'Runs ' + dep.join(', ');
		
		//tasks with descriptions: Output of name & task description to log
		if (task in descriptions) {
			displayTaskWithDescription(task, prettyTaskName);

		//tasks with no descriptions
		} else {
			displayNoDescriptionTask(prettyTaskName, dep, depStr);
		}

    });
    
	if (isFlagDescriptionObj(flagDescriptions)){
		console.log('\n' + chalk.bold.green('Flags:') + '\n');
		
		Object.keys(flagDescriptions).forEach(function (flag) {
			var wrappedDescription = wordWrap(flagDescriptions[flag], 
											  wrapSettings);
			var prettyTaskNameFlag = chalk.bold((flag + indentString).substr(0,indent));
			console.log(prettyTaskNameFlag + ' - ' + wrappedDescription + '\n');
		});
		
	}
    
  };
};