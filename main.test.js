const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('Express Route Test', function () {
	it('should return hello world', async () => {
	return request.get('/hello')
		.expect(200)
		.expect('Content-Type', /text/)
		.then(res => {
		expect(res.text).toBe('Hello BENR2423');
		});
	 })

	it('login successfully', async () => {
		return request
			.post('/login')
			.send({'username': "crit", 'password': "4567" })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("login successful!");
			});
	});
    it('register', async () => {
        return request
			.post('/register')
			.send({'username': 'abu1', 'password': '6789','name': 'samad','staff_id':'020','phonenumber': '01345667' })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("user successfully saved.");
			});
	});

	it('login failed', async () => {
		return request
			.post('/login')
			.send({'username': "crit", 'password': "4256" })
			.expect('Content-Type', /text/)
			.expect(404).then(response => {
				expect(response.text).toEqual("Wrong password");
			});
	})

	

	it('register failed', async () => {
		return request
			.post('/register')
			.send({'username': 'crit', 'password': "4567",'name':'alif','staff_id':'050','phonenumber':'012345678' })
			.expect('Content-Type', /text/)
			.expect(404).then(response => {
				expect(response.text).toEqual("user duplicate!");
			});
	})
});