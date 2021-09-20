const redis = require("redis");

const CHANNELS = {
  TEST: "TEST",
};

class PubSub {
  constructor() {
    this.publisher = redis.createClient({
      host: "redis-server",
      port: 6379,
    });
    this.subscriber = redis.createClient({
      host: "redis-server",
      port: 6379,
    });

    this.subscriber.subscribe(CHANNELS.TEST);

    this.subscriber.on("message", (channel, message) =>
      this.handleMessage(channel, message)
    );
  }

  handleMessage(channel, message) {
    console.log(`Message recieved. Channel: ${channel}. Message: ${message}.`);
  }
}

const testPubSub = new PubSub();

setTimeout(() => {
  testPubSub.publisher.publish(CHANNELS.TEST, "foo");
}, 1000);
