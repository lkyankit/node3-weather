const request =require('request')

const geocode=(address,callback)=>{
    const geourl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibGt5YW5raXQ5ODUyIiwiYSI6ImNrOGg2Z2xucjAxZmYzZHBjNm02OG5oeWoifQ.UYvaaPejV2UYHMX8lDRNqw&limit=1';
    request({url:geourl,json:true},(error,response)=>
    {
        if(error)
        {
            callback('unable to connect ',undefined)
        }
        else if(response.body.features.length===0)
        {
            callback('can not find location',undefined)
        }
        else{
            callback(undefined,{
                latitute:response.body.features[0].center[1],
                         longitute:response.body.features[0].center[0],
                   location:response.body.features[0].place_name
            })
        }
    })
}

module.exports=geocode