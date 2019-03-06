const feedbacks = [
  {
    id: 1,
    name: 'Admin',
    text: 'Best site with cool(?!) design',
  }
];

let lastId = 1;

const getFeedbacks = (req, res) => {
  res.send({ feedbacks });
};

const addFeedback = (req, res) => {
  const { name, text } = req.body;

  if (!name || !text) {
    res.sendStatus(400);
  } else {
    const feedback = {
      id: ++lastId,
      name,
      text,
    };

    feedbacks.push(feedback);

    res.send({ feedback: { name, text } });
  }
};

module.exports = function feedbackHandler(req, res) {
  switch (req.method) {
    case 'GET':
      getFeedbacks(req, res);
      break;
    case 'POST':
      addFeedback(req, res);
      break;

    default:
      res.sendStatus(404);
      break;
  }
};
