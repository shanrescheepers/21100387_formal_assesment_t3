const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    bmi: {
        type: Number,
        required: true
    },
    eyeColor: {
        type: String,
        required: true
    },
    incomePm: {
        type: Number,
        required: true
    },
    interestedIn: {
        type: String,
        required: true
    },
})

const StindereeSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    profile: {
        type: ProfileSchema,
        required: true
    }
});

const Stinderee = mongoose.model("Stinderee", StindereeSchema);

module.exports = { Stinderee };