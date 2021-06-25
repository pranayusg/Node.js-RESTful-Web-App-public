// No of tests should be >= no of endpoints
// "test": "jest --watchAll --detectOpenHandles --coverage" to get coverage.Inside index.html is the coverage report

const { async } = require('q');
const request = require('supertest');
const datastore = require('../../public/model/datastore');
const server = require('../../app');


var token
describe('/user/signin', () => {
// All routes in sigin should be tested here
    describe('POST /', () => {
        test('Test token generation', async () => {
            const data = { email: 'pranayu6@gmail.com', password: 'beast' };

            const res = await request(server).post('/user/signin').send(data)
            let value=res.text;
            token=value.substring(value.indexOf('<p>')+3,value.indexOf('</p>'))
            
            expect(res.status).toBe(200);
            // expect(res.text).toMatch(/Alan/);

            // expect(res.body.some(g=>g.name==='genre1')).toBeTruthy();

        })
    })
})



describe('/form/formdata', () => {
    // beforeEach(() => { server = require('../app'); })
    afterEach(() => {
        // server.close();
        datastore.removeItem('Alan');
    }, 15000)

    describe('POST /', () => {
        test('Test data insertion', async () => {
            const location = { lat: 37.0902, lon: 95.7129 };

            const data = {
                "headers":{"authorization":"Bearer "+token},
                "firstName": "Alan",
                "lastName": "Walker",
                "description": "DJ and record producer.",
                "age": 36,
                "weight": 65,
                "gender": "Male"
            };

            await request(server).post('/form/location').send(location)
            const res = await request(server).post('/form/formdata').send(data)

            expect(res.status).toBe(200);
            expect(res.text).toMatch(/Alan/);

            // expect(res.body.some(g=>g.name==='genre1')).toBeTruthy();

        })
    })
})



