module.exports = function(controller) {
  var Msg = require('../models/msg.js');

  // Every to any incoming message
  controller.on(['ambient', 'direct_message', 'direct_mention', 'mention'], function(bot, message) {

    // Hand the message obj to the Msg modle to add it to the database.
    Msg.add(message, function() {
      console.log('Msg Archived.');
    }, function(err) {
      console.log('err' + err);
    });
  });

  controller.hears('recall', ['direct_message', 'direct_mention'], function(bot, message) {
    bot.reply(message, 'Recalling previous messages from this channel. Check your DMs :mailbox_with_mail:');
    // Recall from the Model
    Msg.recall({
      channel: message.channel,
      limit: 10
    }, function(docs) {

      // Initiate a DM conversation with the author of the heard message
      bot.startPrivateConversation(message, function(err, dm) {
        var combinedMsg = '> <#' + docs[0].channel + '>\'s last ' + docs.length + ' messages.\n\n';
        for (var i = 0; i < docs.length; i++) {

          var doc = docs[i];
          // CombinedMsg += doc.ts + '<#' + doc.channel +'> <@' + doc.user + '>: '+ doc.text + '\n';
          combinedMsg += '<@' + doc.user + '>: ' + doc.text + '\n';
        }
        dm.say(combinedMsg);
      });
    }, function(err) {
      console.log('err' + err);
    });
  });
}
