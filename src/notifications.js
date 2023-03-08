const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.post('/sendToAll',(req, res)=>{

    var notification = {
        'title': 'Hello World',
        'text': 'Subtitle'
    };

    var fcm_tokens = []

    var notification_body = {
        'notification' :notification,
        'registrations_ids': fcm_tokens
    }

    fetch('https://fcm.googleapis.com/fcm/send',{
        'method': "POST",
        'headers': {
            'Authorization': 'key'+'BBH_bXiLWKWi9YoFMpZG86QyWufhlYJ7kVcG65lbE0UZYdMtxv-piEpleLte6zkXuPq0hKp4q0d7wvMRmG2U1lw',
            'Content-Type':'application/json'

            
        },
        'body':JSON.stringify(notification_body)


    }).then(()=>{
        res.status(200).send('Notification sent sucessfully')
    }).catch((err)=>console.log(err))
})

module.exports = router