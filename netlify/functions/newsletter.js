let subscribers = [];

const subscribeNewsletter = (body) => {
  const { email } = body;

  if (!email) {
    return { success: false, error: 'Email is required' };
  }

  // Check if email already exists
  const existingSubscriber = subscribers.find(sub => sub.email === email);
  if (existingSubscriber) {
    return { success: false, error: 'Email already subscribed' };
  }

  const newSubscriber = {
    id: subscribers.length + 1,
    email,
    subscribedAt: new Date().toISOString()
  };

  subscribers.push(newSubscriber);

  return { success: true, message: 'Successfully subscribed to newsletter', data: newSubscriber };
};

const getSubscribers = () => {
  return { success: true, data: subscribers, count: subscribers.length };
};

const unsubscribeNewsletter = (id) => {
  const subscriberIndex = subscribers.findIndex(sub => sub.id === parseInt(id));

  if (subscriberIndex === -1) {
    return { success: false, error: 'Subscriber not found' };
  }

  const unsubscribed = subscribers.splice(subscriberIndex, 1);

  return { success: true, message: 'Successfully unsubscribed from newsletter', data: unsubscribed[0] };
};

exports.handler = async (event, context) => {
  const { httpMethod, path, body, pathParameters } = event;
  const id = pathParameters ? pathParameters.id : null;

  let response;

  try {
    switch (httpMethod) {
      case 'POST':
        if (path.includes('/newsletter')) {
          response = subscribeNewsletter(JSON.parse(body));
        }
        break;
      case 'GET':
        if (path.includes('/newsletter')) {
          response = getSubscribers();
        }
        break;
      case 'DELETE':
        if (path.includes('/newsletter') && id) {
          response = unsubscribeNewsletter(id);
        }
        break;
      default:
        response = { success: false, error: 'Method not allowed' };
    }

    return {
      statusCode: response.success ? 200 : (response.error === 'Email already subscribed' ? 409 : (response.error === 'Subscriber not found' ? 404 : 400)),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE'
      },
      body: JSON.stringify(response)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ success: false, error: 'Internal server error' })
    };
  }
};
