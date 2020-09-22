const db = require("../models");
const User = db.user;
const request = require("supertest");
const expect = require("chai").expect;
const app = require("../app");
describe("api/users", () => {
    beforeEach(async () => {
        await User.destroy({
            where: {},
            truncate: true
        });
    });

    describe("GET /", () => {
        it("should return all users", async () => {
            const users = [
                {first_name: "test", last_name: 'test', email: "test@gmail.com", password: "123456"},
                {first_name: "test1", last_name: 'test', email: "test1@gmail.com", password: "123456"}
            ];
            await User.bulkCreate(users);
            console.log(users);
            const res = await request(app).get("/api/users");
            expect(res.status).to.equal(200);
            expect(res.body.data.length).to.equal(2);
        });
    });

    describe("GET/:id", () => {
        it("should return a user if valid id is passed", async () => {
            const user = new User({
                first_name: "test",
                last_name: "test",
                email: "test@gmail.com",
                password: "123456"
            });
            await user.save();
            const res = await request(app).get("/api/users/" + user.id);
            expect(res.status).to.equal(200);
            expect(res.body.data).to.have.property("first_name", user.first_name);
        });

        it("should return 400 error when invalid object id is passed", async () => {
            const res = await request(app).get("/api/users/1");
            expect(res.status).to.equal(404);
        });

        it("should return 404 error when valid object id is passed but does not exist", async () => {
            const res = await request(app).get("/api/users/111111111111");
            expect(res.status).to.equal(404);
        });
    });

    describe("POST /", () => {
        it("should return user when the all request body is valid", async () => {
            const res = await request(app)
                    .post("/api/users")
                    .send({
                        first_name: "test",
                        last_name: "test",
                        email: "test@gmail.com",
                        password: "123456"
                    });
            expect(res.status).to.equal(200);
            expect(res.body.data).to.have.property("id");
            expect(res.body.data).to.have.property("first_name", "test");
        });

        // add more tests to validate request body accordingly eg, make sure name is more than 3 characters etc
    });

    describe("PUT /:id", () => {
        it("should update the existing order and return 200", async () => {
            const user = new User({
                first_name: "test",
                last_name: "test",
                email: "test@gmail.com",
                password: "123456"
            });
            await user.save();

            const res = await request(app)
                    .put("/api/users/" + user.id)
                    .send({
                        first_name: "newtest",
                        last_name: "newtest",
                        email: "newtest@gmail.com",
                        password: "123456"
                    });

            expect(res.status).to.equal(200);
            expect(res.body.data).to.have.property("first_name", "newtest");
        });
    });

    describe("DELETE /:id", () => {
        it("should delete requested id and return response 200", async () => {
            const user = new User({
                first_name: "newtest",
                last_name: "newtest",
                email: "newtest@gmail.com",
                password: "123456"
            });
            await user.save();

            const res = await request(app).delete("/api/users/" + user.id);
            expect(res.status).to.be.equal(200);
        });

        it("should return 404 when deleted user is requested", async () => {
            const user = new User({
                first_name: "newtest",
                last_name: "newtest",
                email: "newtest@gmail.com",
                password: "123456"
            });
            await user.save();

            let res = await request(app).delete("/api/users/" + user.id);
            expect(res.status).to.be.equal(200);

            res = await request(app).get("/api/users/" + user.id);
            expect(res.status).to.be.equal(404);
        });
    });
});