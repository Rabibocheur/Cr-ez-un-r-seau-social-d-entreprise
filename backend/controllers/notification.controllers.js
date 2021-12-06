const models = require("../models");

exports.getNotifications = async (req, res) => {
  const userUuid = req.token.userUuid;
  try {
    const user = await models.User.findOne({ where: { uuid: userUuid } });
    const notifications = await models.Notification.findAll({
      where: { userId: user.id },
      include: "sender",
      order: [['createdAt', 'DESC']]
    });
    return res.status(200).json(notifications);
  } catch (e) {
    return res.status(500).json(e);
  }
};

exports.MarkAsRead = async (req, res) => {
  const userUuid = req.token.userUuid;
  
  try {
    const user = await models.User.findOne({ where: { uuid: userUuid } });

    const notifications = await models.Notification.findAll({
      where: { userId: user.id, viewed: false }
    });

    for(let i in notifications){
      notifications[i].viewed = true;
      await notifications[i].save();
    }

   return res.status(200).json({message: 'Notifications marquer comme lu'});

  } catch (e) {
    return res.status(500).json(e);
  }
};
