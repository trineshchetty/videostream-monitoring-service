const Joi = require("joi")
const moment = require("moment")


const videoStreamSchema = Joi.object().keys({
    ip_addr: Joi.string().required().ip({
        "version": "ipv4"
    }),
    video_name: Joi.string(),
    codec_info: Joi.string(),
    file_type: Joi.string(),
    size: Joi.string(),
    src: Joi.string(),
    framerate: Joi.string(),
    video_ended: Joi.boolean().required(),
    video_playing: Joi.boolean().required(),
    video_start_time: Joi.date().default(() => moment(moment.now()).format("YYYY-MM-DDTHH:mm:ss")).required(),
    video_end_time: Joi.date().default(() => moment(moment.now()).format("YYYY-MM-DDTHH:mm:ss")).required().allow(null),

})


const videoStreamSchemaDto = Joi.object().keys({
    ip_addr: Joi.string().required().ip({
        "version": "ipv4"
    }),
    video_name: Joi.string(),
    codec_info: Joi.string(),
    file_type: Joi.string(),
    size: Joi.string(),
    src: Joi.string(),
    framerate: Joi.string()
})

const reqStreamsDto = Joi.object().keys({
    ip_addr: Joi.string().required().ip({
        "version": "ipv4"
    }),
})

module.exports = {
    videoStreamSchema,
    videoStreamSchemaDto,
    reqStreamsDto
}