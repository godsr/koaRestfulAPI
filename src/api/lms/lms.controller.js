const Ajv = require('ajv');

console.log("controller start");

exports.list = async (ctx) => {
    const lmsdata = ctx.request.body;
    ctx.body = lmsdata;
    console.log(ctx.body);
};

exports.create = async (ctx) => {
    const lmsdata = ctx.request.body;
    const requestIp = ctx.request.ip;

    let schema = {
                // JSON body로 오브젝트 사용
        type: 'object',
                // 반드시 필요한 프로퍼티들을 정리
        required: ['type', 'id', 'device_id', 'device_type', 'device_ip', 'device_lat', 'device_long', 'event_time', 'event_level', 'event_message'],

                // 사용하는 프로퍼티들
        properties: {
            type: { type: 'number',
                    maximum : 1},
            id: { type: 'string' },
            device_id : { type: 'string' },
            device_type: { type: 'string' },
            device_ip: { type: 'string' },
            device_lat: { type: 'number' },
            device_long: { type: 'number' },
            event_time: { type: 'number' },
            event_level: { type: 'string' },
            event_message: { type: 'string' },
        },
};


    const ajv = new Ajv();
        const isValid = ajv.validate(schema, lmsdata);
        let message = {
            statuscode : '2000',
            message : 'success!'
        }

        ctx.body = {
            lmsdata,
            requestIp,
            message
        }

        if (!isValid) {
            const errorMessages = ajv.errorsText();      
            ctx.body = {
                statuscode : '5000' ,
                message : 'error',
                detail_message :`Validation Error. ${errorMessages}`
            }
            //throw new Error(`Validation Error. ${errorMessages}`);
        }

    console.log(ctx.body)
    
};
