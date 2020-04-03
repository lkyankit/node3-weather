const request =require('request')

const forcast=(longitute,latitute,callback)=>{

    const url = 'https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&latitude='+encodeURIComponent(latitute)+'&longitude='+encodeURIComponent(longitute)+'&oneobservation=true&app_id=devportal-demo-20180625&app_code=9v2BkviRwi9Ot26kp2IysQ';

    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback('unable to connect ',undefined)
        }
        // else if(response.body.error)
        // {
        //     callback('can not find location',undefined)
        // }
        else{
            callback(undefined, response.body.observations.location[0].observation[0].temperature)
        }

    })

}

module.exports=forcast