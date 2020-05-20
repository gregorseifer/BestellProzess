import { Client, logger } from 'camunda-external-task-client-js';
import { find } from './service';

const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'charge-card'
client.subscribe('kundendaten', async ({ task, taskService }) => {
    // Get a process variable
    const prename = task.variables.get('prename');
    const surname = task.variables.get('surname');
    const result = await find(prename, surname);
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

client.subscribe('', async () => {

});