// Mock newsletter subscribers - In a real app, this would be stored in a database
let subscribers = [];

const subscribeNewsletter = (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    // Check if email already exists
    const existingSubscriber = subscribers.find(sub => sub.email === email);
    if (existingSubscriber) {
      return res.status(409).json({
        success: false,
        error: 'Email already subscribed'
      });
    }

    const newSubscriber = {
      id: subscribers.length + 1,
      email,
      subscribedAt: new Date().toISOString()
    };

    subscribers.push(newSubscriber);

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: newSubscriber
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to subscribe to newsletter'
    });
  }
};

const getSubscribers = (req, res) => {
  try {
    res.json({
      success: true,
      data: subscribers,
      count: subscribers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscribers'
    });
  }
};

const unsubscribeNewsletter = (req, res) => {
  try {
    const { id } = req.params;

    const subscriberIndex = subscribers.findIndex(sub => sub.id === parseInt(id));

    if (subscriberIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Subscriber not found'
      });
    }

    const unsubscribed = subscribers.splice(subscriberIndex, 1);

    res.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter',
      data: unsubscribed[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to unsubscribe from newsletter'
    });
  }
};

module.exports = {
  subscribeNewsletter,
  getSubscribers,
  unsubscribeNewsletter
};
