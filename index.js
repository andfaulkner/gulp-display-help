"use strict";

var chalk = require('chalk');
var wordWrap = require('word-wrap');


module.exports = function (taskList, descriptions, excludes, flagDescriptions, styles) {

	//private functions - local
	var __isDefObj,
		__rmPrivate,
		__validateFixFlagDescriptions,
		__formatDefName,
		__calculateIndent,
		__initDisplay,
		__displayUsage, 
		__displayFlag,
		__displayTask,
		__displayNoDescriptionTask,
		__displayFlagDescriptions;

	//Formatting for the task's help text title
	__formatDefName = function(name){
		return chalk.bold((name + wrapSettings.indent)
				.substr(0, wrapSettings.indent.length));
	}
	__formatDefName


	//wordWrap settings
	var wrapSettings = {
			indent: '                             ', 
			width: '60',
	};

//	Styles to implement
//	mainTitleColor: 
//	minorTitleColor: 
//	defColor: 
//	mainTextColor: 

	
/***************************** UTILITY FUNCTIONS *****************************/
	/**
	 * @private
	 * Remove tasks on the 'exclude' list from the 'tasks' object, preventing
	 * them from being displayed in the outputted help file.
	 */
	__rmPrivate = function(excludes, tasks) {
		excludes.forEach(function(item, index){
			if (tasks.hasOwnProperty(item)){
				delete tasks[item];
			}
		});
		return tasks;
	}

	/**
	 * @private
	 * Check if an object passed to this module is valid
	 */
	__isDefObj = function(item){
	    if (typeof item !== "undefined" && 
	    	item !== null && 
	    	typeof item !== 'string' && 
	    	(!(Object.keys(item).length <= 0)) &&
	    	typeof item === 'object')
	    {

	    	return (Object.keys(item)).every(function(key, index){
	            if (typeof key !== 'string' || 
	            	typeof item[key] !== 'string'){
	                	return false;
	            }
	            return true;
	        });
	    }

	    return false;
	}


	/**
	 * @private
	 * List of flags (e.g. --production) & descriptions of each
	 * 
	 * @param flagDescriptions {Object}
	 * @param indentString {Object}
	 * @param indent {Object}
	 */
	__validateFixFlagDescriptions = function(flagDescriptions, indentString, indent){
		var origFlag;
		
		if (__isDefObj(flagDescriptions)){

			Object.keys(flagDescriptions).forEach(function (flag) {
				
				if (flag.toString().slice(0, 2) !== "--"){
					if (flag.toString().slice(0,1) !== "-") {
						origFlag = flag;
						flag = "--" + flag;
						flagDescriptions[flag] = flagDescriptions[origFlag];
						delete flagDescriptions[origFlag];
					} else {
						origFlag = flag;
						flag = "-" + flag;
						flagDescriptions[flag] = flagDescriptions[origFlag];
						delete flagDescriptions[origFlag];
					}
				}
			});
			return flagDescriptions;
		}
		return false;
	};


	/**
	 * Returns the appropriate indent size given the flags and task names 
	 * provided (with those excluded already eliminated).
	 */
	__calculateIndent = function(tasks, flagDescriptions){
		var flags, allNames = [];
		
		//create array of all task & flag names (for determining longest item, to get for indent size)
		tasks.forEach(function(item, index){
			allNames.push(item);
		});	
		if (__isDefObj(flagDescriptions)){
			flags = Object.keys(flagDescriptions);
			flags.forEach(function(item, index){
				allNames.push(item);
			});		
		}
		
		//Determine length of indent & set up an indent string
		return allNames.reduce(function (winner, current) {
			return Math.max(current.length, winner);
		}, 0);
	}
	

	/**
	 * Formats/styles the title of the task or flag
	 */
	__formatDefName = function(name){
		return chalk.bold((name + wrapSettings.indent)
				.substr(0, wrapSettings.indent.length));
	}
	/*****************************************************************************/



	/***************************** DISPLAY FUNCTIONS *****************************/
	/**
	 * @private
	 * Display Gulpfile usage section
	 * @param taskList {Object}
	 */
	__displayUsage = function(taskList) {
		var isDefault, isFlags, isTasks;
		
		//Main title
		console.log("\n\n" + chalk.bold("***************************************"));
		console.log(chalk.bold("  GULP COMMANDS AVAILABLE FOR PROJECT"));
		console.log(chalk.bold("***************************************"));
		console.log("\n" + chalk.bold.underline("SYNOPSIS"));
		
		if (flagDescriptions !== "undefined" && 
				flagDescriptions !== null) isFlags = true;
		else isFlags = false;
		
		isDefault = (Object.keys(taskList)).some(function(key, index){
			if (key === "default") return true;
			else isTasks = true;
			return false;
		});

		if (isDefault) console.log("gulp");
		if (isFlags) console.log("gulp [OPTIONS]");
		if (isTasks) console.log("gulp [TASK]");
		if (isFlags && isTasks) console.log("gulp [TASK] [OPTIONS]");
		return true;
	}


	/**
	 * @private
	 * Handle display of tasks & flags with descriptions provided
	 * (Still needs a bit of fixup)
	 * 
	 * @param item {String} Name of task or flag
	 * @param prettyDefName {Chalk} Name of task or flag, formatted for display
	 */
	__displayFlag = function(item, prettyDefName, defs){
		var defStr, firstLn, rest;

		defStr = defs[item];
		firstLn = (defStr.slice(0, wrapSettings.width));
		rest = (defStr.slice(wrapSettings.width, defStr.length));
		
		//Display the definition (both title and description)
		console.log(prettyDefName + ' - ' + firstLn);
		console.log(wordWrap(rest + "\n", {indent: wrapSettings.indent + "   ",
										   width: wrapSettings.width}));
	}

	/**
	 * @private
	 * Taskrunner tasks with no description: log name, list of tasks it runs
	 */
	__displayNoDescriptionTask = function(prettyTaskName, dep, depStr){

		//display tasks with task lists & no description
		if (dep.length) {
			//Single line task list
			if (depStr.length <= wrapSettings.width){
				console.log(prettyTaskName + ' - ' + depStr + '\n');

			//Multiline tasklist
			} else {
				__displayTask(depStr, prettyTaskName);
			}

		//Output task name only, if no description or task list
		} else {
			console.log(prettyTaskName + '\n');
		}
	}


	/**
	 * @private
	 * Handle display of help text for tasks with tasklists spanning multiple lines
	 */ 
	__displayTask = function(depStr, prettyTaskName){
		var rest, firstLn, partialEndWord;
		
		//Display single-line definitions
		if (depStr.length < wrapSettings.width) {
			console.log(prettyTaskName + ' - ' + depStr);

		//Display multiline definitions
		} else {
			firstLn = depStr.toString().slice(0, wrapSettings.width);
			
			if (firstLn.slice(-1).match(/[a-zA-Z0-9_]$/g) !== null) {  //determines if partial word at end
				partialEndWord = (firstLn.match(/\s[^s]*$/))[0]; 		//gets partial word at end
				firstLn = firstLn.slice(0, firstLn.length - partialEndWord.length);
				rest = partialEndWord.slice(1) + depStr.slice(wrapSettings.width,
						depStr.length) + '\n';
				
			} else {
				rest = depStr.slice(wrapSettings.width, depStr.length) + '\n';
			}
			
			console.log(prettyTaskName + ' - ' + firstLn);
			console.log(wordWrap(rest, { indent: wrapSettings.indent + "   ", width: wrapSettings.width }));
		}

	}


	/**
	 * Kickstart the sequence of displaying all items - figure out how each
	 * item should be displayed and what function to handle it
	 * 
	 * @param taskList {Array}
	 * @param descriptions {Object}
	 * @param flags {Object}
	 */
	__initDisplay = function(taskList, descriptions, flags, flagDescriptions){
		var prettyDefName, dep, depStr;

		//Show main synopsis of command structure
		__displayUsage(taskList);
		
		//Show registered tasks title:
		console.log('\n' + chalk.bold.underline('\nREGISTERED TASKS'));
		
		//Display the taskname and its description
		Object.keys(taskList).forEach(function (task) {
			prettyDefName = __formatDefName(task);

			//tasks with descriptions: Output of name & task description to log
			if (task in descriptions) {
				__displayTask(descriptions[task], prettyDefName);

			//tasks with no descriptions
			} else {
				dep = taskList[task].dep;
				depStr = 'Runs ' + dep.join(', ');
				__displayNoDescriptionTask(prettyDefName, dep, depStr);				
			}
			
		});

		//Display options (aka flags) title
		console.log('\n' + chalk.bold.underline('\nOPTIONS'));

		//Display the flags and their descriptions
		Object.keys(flagDescriptions).forEach(function(flag) {
			prettyDefName = __formatDefName(flag);
	
			__displayFlag(flag, prettyDefName, flagDescriptions);
			return true;
		});
	}
	/*****************************************************************************/
	
	
	


/***************************************** EXPORT *****************************************/
/**
 * @public
 * exported gulp help object
 */
return function () {
	var tasks, indentLength, flags;
	descriptions = descriptions || {};

	//Remove excluded tasks from the task list
	if ((typeof excludes !== "undefined") && 
			(excludes !== null) && (Array.isArray(excludes))) {
		taskList = __rmPrivate(excludes, taskList);
	}

	//prefixes flag names with '--' (if -- not present already)
	flagDescriptions = __validateFixFlagDescriptions(flagDescriptions);
	
	indentLength = __calculateIndent(Object.keys(taskList), flagDescriptions);
	wrapSettings.indent = (new Array(indentLength+1)).join(' ');

	__initDisplay(taskList, descriptions, flags, flagDescriptions);
	
  };


};
