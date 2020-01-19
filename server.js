var express = require('express');
var app = express();
const {PubSub} = require('@google-cloud/pubsub');
const pubSubClient = new PubSub();

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const topicName = 'command';
data = "Shutdown";
pass = ""

app.use(express.text())

app.post('/test', (req, res) => {
	console.log('Got body: ', req.body);
	console.log(req.get('content-type'));
	res.sendStatus(200);
	pass = req.body;
	console.log('password',pass);
	
	//google cloud
	publishMessage().catch(console.error);
	
});

//port was 8001 before, localhost
app.listen(8001, '0.0.0.0', function () {
    console.log("\nServer running");
});

async function publishMessage() {
  /**
   * TODO(developer): Uncomment the following lines to run the sample.
   */
  // const topicName = 'my-topic';

  console.log('It gets here');
  data = "Shutdown" + ' ' + pass;
  console.log(data);
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(data);

  const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
  console.log(`Message ${messageId} published.`);
}