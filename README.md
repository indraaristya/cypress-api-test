# cypress-api-test

## How to run
We need to clone the repository to your local device using this script `git clone git@github.com:indraaristya/cypress-api-test.git`

In your local device, go to the cloned repository `cd ./cypress-api-test` and run `npm i` to intall all depedencies in `package.json`.
After the installation finished, we can run the test with type this command.
```
npm run cypress:all
```
Once the test executed and finished, the report will be generated and saved in directory `./cypress/results/api-test-result.html` (open with browser to compile the HTML and see the report)


If you want to open the cypress GUI to see the details test progress, run this command.
```
npm run cypress:open
```
