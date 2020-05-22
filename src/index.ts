import { Client, logger } from 'camunda-external-task-client-js';
import { findOne, logAbbruch, sendeRechnung } from './service';

const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'charge-card'
client.subscribe('kundendaten', async ({ task, taskService }) => {
    // Get a process variable
    const prename = task.variables.get('prename');
    const surname = task.variables.get('surname');
    const result = await findOne(prename, surname);
    if (result === undefined) {
        const message = `${prename} ${surname} ist kein Kunde.`;
        await taskService.handleBpmnError(task,'1', message);
        console.log(`BpmnError: message=${message}`);
    } else {
        // Complete the task
        task.variables.set('id', result.id);
        task.variables.set('loyalityScore', result.loyalityScore);
        task.variables.set('sales', result.sales)
        await taskService.complete(task);
    }
});

client.subscribe('rechnung', async ({ task, taskService}) => {
    const prename = task.variables.get('prename');
    const surname = task.variables.get('surname');
    const id = task .variables.get('id');
    const product = task.variables.get('product');
    const price = task.variables.get('price');
    sendeRechnung({ prename, surname, id }, product, price);
    await taskService.complete(task);
});

client.subscribe('abbruch', async({ task, taskService}) => {
    const prename = task.variables.get('prename');
    const surname = task.variables.get('surname');
    const product = task.variables.get('product');
    logAbbruch(prename, surname, product);
    await taskService.complete(task);
});
