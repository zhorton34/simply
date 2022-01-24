const pad = require('pad')
const colors = require('colors')
const inquirer = require('inquirer')
const { collect } = require('collect.js')
const fileTreePrompt = require('inquirer-file-tree-selection-prompt')


inquirer.registerPrompt('file-tree', fileTreePrompt)

function operation(answers) {
    console.log(JSON.stringify(answers))
}

function deleteEachFileSelected () {

}

function moveEachFileSelected() {

}

function copyEachFileSelected() {

}

function runOperationOnEachFileSelected() {

}

module.exports = {
    name: 'tree',
    aliases: ['file-tree', 'treeable'],
    description: 'search file tree and select file',
    options: [
        ['-r, --root <path>', 'root folder to start search from. Defaults to process.cwd()'],
        ['-m, --multiple', 'select muliple files/file paths from the file tree. Defaults to false', false],
        ['-d, --delete', 'delete muliple files/file paths from the file tree. Defaults to false', false]
    ],
    run: function (context) {
        inquirer.prompt([{ 
            type: 'file-tree', 
            name: context.config.name,
            root: context.request.root,
            multiple: context.request.multiple,
        }])
        .then((answers) => {
            operation(answers, context)
        })
        .catch(console.error)
    }
}