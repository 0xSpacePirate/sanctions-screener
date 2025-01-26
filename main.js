import chalk from 'chalk';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

async function checkAddress(address) {
    try {
        const response = await axios.get(
            `https://public.chainalysis.com/api/v1/address/${address}`,
            {
                headers: {
                    'X-API-Key': process.env.CHAINALYSIS_API_KEY,
                    'Accept': 'application/json'
                }
            }
        );
        
        const { identifications } = response.data;
        
        if (identifications.length === 0) {
            console.log(chalk.green('All good here! The address is NOT sanctioned'));
            return false;
        }
        
        console.log(chalk.red('THE ADDRESS IS SANCTIONED!'));
        console.log(chalk.cyan('-------------------------------------'));

        identifications.forEach(id => {
            console.log(chalk.yellow(`Name: ${id.name}`));
            console.log(chalk.white(`Description: ${id.description}`));
            console.log(chalk.magenta(`Category: ${id.category}`));
            console.log(chalk.blue(`URL: ${id.url}`));
            console.log(chalk.cyan('-------------------------------------'));
        });
        
        return true;
    } catch (error) {
        if (error.response) {
            console.error(chalk.red(`Error: ${error.response.status} - ${error.response.data.type}`));
        } else {
            console.error(chalk.red('Error:', error.message));
        }
        throw error;
    }
}

const address = process.argv[2];

if (!address) {
    console.error(chalk.red('Please provide an address as an argument. For example: node main.js <address>'));
    process.exit(1);
}

checkAddress(address).catch(error => process.exit(1));