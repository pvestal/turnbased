const functions = require('firebase-functions');

// Listen for updates to any 'turn' document.
exports.resetGame = functions.firestore
    .document('game/turn')
    .onUpdate((change, context) => {
      // Retrieve the current and previous value
      const data = change.after.data();
      const previousData = change.before.data();

      // We'll only update if another user submits.
      if (data.currentUser === previousData.currentUser) return null;
      
      let gameStatus = data.gameStatus;
      let modCount = data.count;

      if (modCount > 9) {
          gameStatus = "reset"
          modCount = 0
      } else {
          gameStatus = "inprogress"
      }

      // Then return a promise of an update operation to update firestore
      return change.after.ref.update({
        gameStatus: gameStatus,
        count: modCount
      }, {merge: true});
    });
