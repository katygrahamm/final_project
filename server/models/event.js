const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
    title: String,
    space: {
        type: Schema.Types.ObjectId,
        ref: 'Space'
    },
    priorityId: Number,
    startDate: Date,
    endDate: Date,
    recurrenceRule: String,
})

module.exports = mongoose.model('Event', EventSchema)