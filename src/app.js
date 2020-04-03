const path=require('path')
const express= require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app =express()
//define path for express config
const viewPath=path.join(__dirname,'../templates/view')
const partialsPath=path.join(__dirname,'../templates/partials')
//setup paths for express config 
app.set('view engine','hbs')
app.set('views',viewPath)

hbs.registerPartials(partialsPath)


app.get('',(req,res)=>{
    res.render('index',{
        title:"weather",
        name:'ankit'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"about",
        name:'ankit'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message:"help message",
        title:'help'
        
    })
})
app.use(express.static(path.join(__dirname,'../public')))

// app.get('',(req,res)=>{
//     res.send('hello express')

// })

// app.get('/help',(req,res)=>{
//    res.send('help page')
// })
// app.get('/about',(req,res)=>{
//     res.send('about')
//  })


 app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:"provide address"
        })
    }
    
    geocode(req.query.address,(error,data)=>{
        
        if(error)
        {
           return res.send({error})
        }
        
        forecast(data.longitute,data.latitute,  (error, forecastdata) => {
            if(error)
        {
           return res.send({error})
        }
        res.send({
            forecast:forecastdata,
            location:data.location,
            address:req.query.address
        })
        
          })
        })

    // res.send({
    //     forecast:'it is snowing',
    //     address:req.query.address,
    //     location:"indore"
    // })
 })



 app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title:"my help 404",
        
    })
})

app.get('*',(req,res)=>{
    res.render('404page',{
        title:"my 404 page",
        
    })
})

app.listen(3000,()=>{
    console.log("server is up on port 3000")
})