const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname:{
        firstName: {
            type: String,
            required: true,
            minLength : [3, 'First name must be at least 3 characters']
        },
        lastName: {
            type: String,
            minLength : [3, 'Last name must be at least 3 characters']
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,    
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        required: true,
        select: false,
        minLength : [6, 'Password must be at least 6 characters']
    },
    socketId: {
        type: String
    },
    // status for active or inactive of the captain for riding cars or not...
    status:{
        type : String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minLength : [3, 'Color must be at least 3 characters']
        },
        plate:{
            type: String,
            required: true,
            minLength : [3, 'Plate must be at least 3 characters']
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1']
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto']
        }
    },
    location:{
        ltd:{
            type: Number,
        },
        lng:{
            type: Number,
        }
    }
})


//* Common methods for captain model..

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}

captainSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

module.exports = mongoose.model('captain', captainSchema);
// console.log(captainModel.schema.obj.location);

