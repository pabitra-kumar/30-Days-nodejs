const User = require('../model/User');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const { gender, domain, available, name } = req.query;
        const query = {};
        if (gender) query.gender = gender;
        if (domain) query.domain = domain;
        if (available) query.available = available;
        if (name) {
            query.$or = [
                { first_name: { $regex: name, $options: 'i' } },
                { last_name: { $regex: name, $options: 'i' } }
            ]
        }

        let users = await User.find(query);

        if (users.length == 0) return res.status(204).json({ "message": "No Employees found" })

        if (req?.query?.page) {
            const page = Number(req?.query?.page) || 1;
            const limit = Number(req?.query?.limit) || 20;
            const skip = (page - 1) * limit;
            users = users.slice(skip, skip + limit);
        }


        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    getAllUsers
}