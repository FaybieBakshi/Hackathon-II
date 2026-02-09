from dapr.clients import DaprClient
import json
import os

DAPR_PUBSUB_NAME = "pubsub-kafka" # Defined in infrastructure/dapr/minikube/pubsub-kafka.yaml

class BaseEventHandler:
    def __init__(self):
        self.dapr_client = DaprClient()

    def publish_event(self, topic: str, event_type: str, data: dict):
        """Publishes an event to a Dapr Pub/Sub topic."""
        event_data = {
            "eventType": event_type,
            "data": data,
            "sourceService": os.getenv("DAPR_APP_ID", "unknown-service")
        }
        try:
            self.dapr_client.publish_event(
                pubsub_name=DAPR_PUBSUB_NAME,
                topic_name=topic,
                data=json.dumps(event_data),
                data_content_type='application/json'
            )
            print(f"Published event to topic '{topic}': {event_data}")
        except Exception as e:
            print(f"Error publishing event to topic '{topic}': {e}")

    def subscribe_to_topic(self, topic: str, handler_func):
        """
        Placeholder for Dapr Pub/Sub subscription logic.
        In a real application, this would typically be handled by a Dapr-enabled web server
        subscribing to endpoints.
        """
        print(f"Service configured to subscribe to topic: {topic}")
        print(f"Handler function: {handler_func.__name__}")
        # Actual subscription requires a running Dapr sidecar and application endpoint
        # Example of how a Flask/FastAPI route would look for Dapr subscription:
        """
        @app.post(f'/{topic}')
        async def topic_handler(request: Request):
            event = await request.json()
            # Process event.data
            handler_func(event['data'])
            return JSONResponse(status_code=200)
        """
