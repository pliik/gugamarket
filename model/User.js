/**
 * Created by pcancela on 30/05/2014.
 *
 */
module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        active : {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        },
        refreshToken: {
            type: Date,
            required: false
        },        
        providerId: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
        },
        photoUrl: {
            type: String,
            required: false
        },
        provider: {
            type: String,
            required: true
        },
        updated: {
            type: Date,
            required: true
        },
        created: {
            type: Date,
            required: true
        }
    });

    var User = mongoose.model('User', UserSchema);

    return {
        User: User
    }
};
