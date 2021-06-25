
const { reject, async } = require('q');
const request = require('supertest');
const server = require('../../app');
const auth = require('../../public/middleware/checkAuth')

 function gettoken() {
    return new Promise(async (resolve,reject)=>{
        try{
        const data = { email: 'pranayu6@gmail.com', password: 'beast' };    
        const res = await request(server).post('/user/signin').send(data)
        let value = res.text;
        token = value.substring(value.indexOf('<p>') + 3, value.indexOf('</p>'))
        resolve(token)
        }
        catch(err){
            reject();
        }
    })
}


describe('auth middleware', () => {
    test('Test decoded token', async () => {
     var token=  await gettoken()
        const req = {
            headers: {
                "authorization": "Bearer " + token
            }
        }
    
        const res={};
        const next=jest.fn();

        auth(req,res,next)
        
        expect(req.userData.mail).toBe('pranayu6@gmail.com');
        expect(req.userData.iss).toBe('pranayusg');
    })
})