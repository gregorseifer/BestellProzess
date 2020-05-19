const { Client, logger } = require('camunda-external-task-client-js');
const open = require('open');
const { find } = require('./service/Kundendaten.service');
// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
//  - 'asyncResponseTimeout': long polling timeout (then a new request will be issued)
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'charge-card'
client.subscribe('kundendaten', async ({ task, taskService }) => {
    // Get a process variable
    const prename = task.variables.get('prename');
    const surname = task.variables.get('surname');
    const result = await find(prename, surname);
    // Complete the task
    task.variables.set('id', result.id);
    task.variables.set('loyalityScore', result.loyalityScore);
    task.variables.set('sales', result.sales)
    await taskService.complete(task);
});

client.subscribe('', async () => {

});