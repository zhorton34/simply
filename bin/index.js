#!/usr/bin/env node

var dotenv = require('dotenv')
var dotenvExpand = require('dotenv-expand')

var myEnv = dotenv.config()
dotenvExpand.expand(myEnv)

const program = require('commander')
const tree = require('../lib/tree');



const cmdSetup = (program, config) => {
    let cmd = program.command(config.name)

    let keys = ['description']
    let iterables = { alias: config.aliases, option: config.options }


    for (key of keys) cmd[key](config[key])

    Object.entries(iterables).forEach(([prop, sets]) => {
        sets.forEach(value => {
            if (prop == 'option') cmd[prop](...value)
            else cmd[prop](value)
        })
    })

    return cmd
} 

cmdSetup(program, tree).action((request, cmd) => {        
    let run = tree.run.bind(program, { config: tree, request, cmd, aliases: cmd.aliases })

    run()
})

// allow commander to parse `process.argv`
program.parse(process.argv);