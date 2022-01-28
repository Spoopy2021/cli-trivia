#!/user/bin/env node

import chalk from 'chalk';
import Inquirer from 'inquirer';
import Gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


let playerName;

var sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));




async function welcome() {
    const animatedWelcome = chalkAnimation.rainbow(
        'Who is ready to play some Trivia? \n'
    );

    await sleep();
    animatedWelcome.stop();

    console.log(`
        ${chalk.bgBlue('HOW TO PLAY TRIVIA')}
        I am a process that runs on your computer.
        If you get any questions wrong my process will be ${chalk.bgRed('Terminated.')}
        So try your hardest to get the questions right.
        I was made by Spoopy, Spoopy#4455 on Discord.
    `);

};

async function askName() {
    const answers = await Inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What would you like your player name to be?',
        default() {
            return 'Player 1'
        },
    });

    playerName = answers.player_name;
};

async function question1() {
    const answers = await Inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Who founded Apple?',
        choices: [
            'Elon Musk',
            'Tim Cook',
            'Susan Wojcicki',
            'Linus Sebastian',
            'Steve Jobs',
            'Mark Zuckerberg',
            'Jeff Bezos',
        ]
    });

    return handleAnser(answers.question_1 == 'Steve Jobs');
};

async function question2() {
    const answers = await Inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'When did World War 2 end?',
        choices: [
            '1 January 1919',
            '18 December 1901',
            '29 October 1900',
            '2 September 1945',
            '27 Febuary 1990',
            '30 April 1899',
        ]
    });

    return handleAnser(answers.question_2 == '2 September 1945');
};

async function question3() {
    const answers = await Inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'When did the Irish Potato Famine start',
        choices: [
            '1 January 1919',
            '18 December 1901',
            '29 October 1900',
            '2 September 1945',
            '27 Febuary 1990',
            '30 April 1899',
        ]
    });

    return handleAnser(answers.question_2 == '2 September 1945');
};

async function handleAnser(isCorrect) {
    const spinner = createSpinner('Checking your input...').start()
    await sleep();

    if(isCorrect) {
        spinner.success({ text: `Nice Job ${playerName}! You got the correct answer!` });
    } else {
        spinner.error({ text: `Oh no ${playerName}! Game over you got the wrong answer. Better luck next time!` });
        process.exit(1);
    };
};

function winner() {
    console.clear();
    const msg = `Congrats , ${playerName} ! \n\n\n\n If you had fun please star on the github repo!`

    figlet(msg, (err, data) => {
        console.log(Gradient.pastel.multiline(data))
    });
};



await welcome();
await askName();
await question1();
await question2();
await winner();