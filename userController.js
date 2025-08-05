const UserAccount = require("../model/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req,res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        console.log(req.body)
        if(!firstName || !lastName || !username || !email|| !password ){
            return res.json({success:false, message:"please enter all fields"})
        }
        const userExists = await UserAccount.findOne({where: {username}});
        if(userExists){
            return res.status(200).json({success:false,message:"username already exists."});
        }
        const emailExists = await UserAccount.findOne({where: {email}});
        if(emailExists){
            return res.status(200).json({success:false,message:"email already exists."});
        }

        const image = req.files && req.files.length > 0 ? req.files[0].path : null;
        console.log('Image path:', image);
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);

        await UserAccount.create({ 
            firstName: firstName, 
            lastName: lastName, 
            username: username, 
            email: email, 
            password: hashedPass, 
            image 
        });

        res.status(201).json({success: true, message: "user created!!"});
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

async function getAllUsers(req,res){
    console.log(req.headers.authorization)
    console.log(req.user.id)
    try{
        const users = await UserAccount.findAll({
            attributes: {
                exclude: ['password']
            },
            order: [['createdAt', 'DESC']]
        });
        res.json({success:true,users:users});
    }catch(error){
        res.status(500).json({error:"error fetching users!"});
    }
}

async function adminLogin(req,res){
    console.log(req.body);
    try{
        const {email, password} = req.body;
        const user = await UserAccount.findOne({where: {email}});
        if(!user){
            return res.status(400).json({success:false,message:"Invalid Credentials."});
        }
        
        // Check if user is admin
        if(user.role !== 'admin'){
            return res.status(403).json({success:false,message:"Access denied. Admin privileges required."});
        }
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({success:false,message:"Invalid Credentials."});
        }
        const token = jwt.sign(
            {id: user.id, role: user.role },
            process.env.JWT_TOKEN || 'your_super_secret_jwt_token_key_here_please_change_in_production',
            {expiresIn: '24h'}
        );
        if(!token){
            return res.status(400).json({success:false,message:"Invalid Credentials."});
        }
        return res.status(200).json({
            success: true, message: 'Admin login successful',token,user:{
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    }catch(error){
        res.status(400).json({error:error});
    }
};

async function getAdminDashboard(req,res){
    try{
        const userCount = await UserAccount.count();
        const adminCount = await UserAccount.count({where: {role: 'admin'}});
        const regularUserCount = userCount - adminCount;
        
        res.json({
            success: true,
            dashboard: {
                totalUsers: userCount,
                adminUsers: adminCount,
                regularUsers: regularUserCount,
                recentUsers: await UserAccount.findAll({
                    attributes: ['id', 'username', 'email', 'createdAt'],
                    order: [['createdAt', 'DESC']],
                    limit: 5
                })
            }
        });
    }catch(error){
        res.status(500).json({error:"Error fetching dashboard data!"});
    }
}

async function loginUser(req,res){
    console.log('Login request body:', req.body);
    try{
        const {email, password} = req.body;
        console.log('Looking for user with email:', email);
        const user = await UserAccount.findOne({where: {email}});
        if(!user){
            console.log('User not found');
            return res.status(400).json({success:false,message:"Invalid Credentials."});
        }
        console.log('User found:', { id: user.id, username: user.username, firstName: user.firstName, lastName: user.lastName });
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            console.log('Password does not match');
            return res.status(400).json({success:false,message:"Invalid Credentials."});
        }
        console.log('Password matches, generating token');
        const token = jwt.sign(
            {id: user.id, role: user.role },
            process.env.JWT_TOKEN || 'your_super_secret_jwt_token_key_here_please_change_in_production',
            {expiresIn: '24h'}
        );
        if(!token){
            console.log('Token generation failed');
            return res.status(400).json({success:false,message:"Invalid Credentials."});
        }
        const userResponse = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            role: user.role
        };
        console.log('Sending response:', { success: true, message: 'Login successful', user: userResponse });
        return res.status(200).json({
            success: true, message: 'Login successful',token,user: userResponse
        });
    }catch(error){
        console.error('Login error:', error);
        res.status(400).json({error:error});
    }
};

async function updateUser(req,res){
    console.log(req.body);
    const {username, email, password } = req.body;
    const {id} = req.user;
    try{
        const user = await UserAccount.findByPk(id);
        if(!user){
            return res.status(400).json({success:false,message:"Invalid Credentials."});
        }
        const image = req.files?.length?req.files[0].path:null;
        let updateFields = {username, email, image};
        console.log(image);
        if(password){
            const salt = await bcrypt.genSalt(10);
            updateFields.password = await bcrypt.hash(password,salt);    
        }
        await UserAccount.update(updateFields,{where: {id}});
        res.json({message: "user updated"});
    } catch (error){
        res.status(400).json({error:error})
    }
}

module.exports ={
    createUser,
    loginUser,
    adminLogin,
    updateUser,
    getAllUsers,
    getAdminDashboard
}