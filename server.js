/*****************************************************************************************************************
@Author:pranayusg
@Description: Starting point of web app and all server interactions are done in this file
*****************************************************************************************************************/
const app=require('./app')
const port= process.env.PORT || 3000;

app.listen(port, () => console.log('lisening at '+port))



