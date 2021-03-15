const Notification = require("../models/notification");

export const addNotification = (req, res) => {
  const newNotification = new Notification(req.body);

  newNotification.save((err, Notification) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Notification);
  });
};

export const getNotificationFromUsername = (req, res) => {
  Notification.find({ username: req.query.username }, (err, Notification) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Notification);
  });
};

export const getNotificationwithID = (req, res) => {
  Notification.findById(req.params.NotificationId, (err, Notification) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Notification);
  });
};

export const updateNotification = (req, res) => {
  Notification.findOneAndUpdate(
    { _id: req.params.NotificationId },
    req.body,
    (err, Notification) => {
      if (err) {
        res.status(500).json({
          message: { msgBody: "Error has Occured", msgError: true },
        });
      }
      res.json(Notification);
    }
  );
};

export const deleteNotification = (req, res) => {
  Notification.remove(
    { _id: req.params.NotificationId },
    (err, Notification) => {
      if (err) {
        res.status(500).json({
          message: { msgBody: "Error has Occured", msgError: true },
        });
      }
      res.json({
        message: {
          msgBody: "Notification deleted successfully",
          msgError: false,
        },
      });
    }
  );
};
