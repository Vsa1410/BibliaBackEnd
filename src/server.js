const {Expo} = require('expo-server-sdk');

const expo = new Expo();

let pushTokens= ["ExponentPushToken[qhfKIuMrrSP2i0uKjiZFem]","ExponentPushToken[E4Unw3Dvafz2TzTspeVNOK]"]

//create a notification message

async function sendNotification(tokens){
    
    let message = {
        to: tokens,
        sound: 'default',
        body: 'Versículo do dia!!',
        data: {
            route: "/search",
            
          }
    }
    let chunks = expo.chunkPushNotifications([message]);
    let tickets = [];

    for (let chunk of chunks){
        try{
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk)
        tickets.push(...ticketChunk)
    }catch(error){
        console.error
    }
    
}
    let receiptIds = []

    for(let ticket of tickets){
        if(ticket.id){
            receiptIds.push(ticket.id)
        }
    }

    let receiptIdChuncks = expo.chunkPushNotificationReceiptIds(receiptIds);
    for(let chunk of receiptIdChuncks){
        try{
            let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
            console.log(receipts)

            for(let receipt of receipts){
                if(receipt.status === 'ok'){
                    continue;
                }else if (receipt.status ==='error'){
                    console.error(`There is an error sending a notification: ${receipt.message}`)
                    if(receipt.details && receipt.details.error){
                        console.error(`The error code is ${receipt.details.error}`)
                    }
                }
            }
        }catch(error){
            console.error(error)

        }
    }
}

module.exports= sendNotification