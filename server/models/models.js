var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

module.exports = function () {

    // User (Student OR Teacher) SCHEMA
    var UserSchema = new mongoose.Schema({
        name: { type: String, required: [true, "Name is required"], minlength: [2, " Name must be  at least 2 characters"] },
        email: { type: String, required: [true, "Email is required"] },
        password: { type: String },
        image: { type: String, default: "https://i.pinimg.com/originals/85/48/ea/8548ea7bbae3129c0f397a8593765717.jpg" },
        type: { type: String, default: "" }
    }, { timestamps: true })

    // Student's Answer SCHEMA::::: A
    var StudentAnswerSchema = new mongoose.Schema({
        student_name: { type: String },
        student_id: { type: String },
        content: { type: String, required: [true, "Write your answer here"] },
    }, { timestamps: true })

    // Teacher's Exercise SCHEMA::::: Q
    var ExerciseSchema = new mongoose.Schema({
        content: { type: String, required: [true, "Write your question here"] },
        answers: [StudentAnswerSchema],
    }, { timestamps: true })

    // Classroom SCHEMA
    var ClassRoomSchema = new mongoose.Schema({
        classroom_name: { type: String, required: [true, "Name of the Class is required"] },
        classroom_code: { type: String },
        exercises: [ExerciseSchema],
        users: [UserSchema]
    }, { timestamps: true })

    UserSchema.plugin(uniqueValidator);
    mongoose.model('User', UserSchema)
    mongoose.model('Exercise', ExerciseSchema);
    mongoose.model('StudentAnswer', StudentAnswerSchema);
    mongoose.model('ClassRoom', ClassRoomSchema);
}


