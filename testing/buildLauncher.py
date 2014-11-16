import os
import re
import sys

###
 # @class BuildLauncher
 # @brief Creates unit testing launcher including all Oscar tests
 ###
class BuildLauncher:

	###
	 # Collects all Oscar test classes
	 ###
	def __collect(self, path):
		collected = []
		pattern = 'class (.*) extends UnitTestClass'

		for root, dirs, files in os.walk(path):
			for fileName in files:
				ext = os.path.splitext(fileName)[1]
				
				if ext == '.ts':
					with open(os.path.join(root, fileName), 'r') as f:
						for line in f:
							outcome = re.findall(pattern, line)
							for e in outcome:
								collected.append(e)
							
		return collected

	###
	 # Runs engine to collect each class then appending it to output
	 # @param output Where launcher will be appended
	 # @param path Folder where engine can find all tests
	 # @param testOutput Output for oscar's outcome (console|html)
	 # @param maxRuntime Max runtime for each test
	 # @param buildFailure If true, build will return a failure code (useful for continous integration)
	 ###
	def run(self, output, path, testOutput, maxRuntime, buildFailure):
		print('\nProcessing...')

		collected = self.__collect(path)

		print ('Collected classes:')
		outcome = '\nnew TestSuite()'
		for e in collected:
			print('\t' + e)
			outcome += '.add(new ' + e + '())'

		outcome += '.run(' + str(testOutput) + ', ' + str(maxRuntime) + ', ' + buildFailure + ');\n'


		with open(output, 'a') as outputFile:
			outputFile.write(outcome)
		print('\nDone!')

if __name__ == '__main__':
	output = 'output.js'
	path = '.'
	testOutput = 0
	maxRuntime = 30 * 1000
	buildFailure = 'true'

	if len(sys.argv) < 2:
		# Wizard
		prompt = ' > '
		print('--- Auto test launcher wizard ---')

		print('\nEnter js destination file (where I am going to append launcher):')
		output = raw_input(prompt)

		print('\nPath where I can find all your test classes: (default \'.\')')
		data = raw_input(prompt)
		if data != '':
			path = data

		print('\nWhich format for output? (0 = Console - default, 1 = HTML)')
		data = raw_input(prompt)
		if data == '0' or data == '1':
			testOutput = data
		
		print('\nMaximum runtime in ms? (default 30*1000ms)')
		data = raw_input(prompt)
		if data.isdigit():
			maxRuntime = data

		print('\nMust Oscar exit with failure if at least one test has failed? (y - default/n)')
		data = raw_input(prompt)
		if data == 'y' or data == 'n':
			if data == 'y':
				buildFailure = 'true'
			else:
				buildFailure = 'false'
	else:
		output = sys.argv[1]
		if len(sys.argv) >= 3:
			path = sys.argv[2]
			if len(sys.argv) >= 4:
				testOutput = sys.argv[3]
				if len(sys.argv) >= 5:
					maxRuntime = sys.argv[4]
					if len(sys.argv) >= 6:
						buildFailure = sys.argv[5]

	BuildLauncher().run(output, path, testOutput, maxRuntime, buildFailure)