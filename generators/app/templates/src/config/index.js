const env = process.env.VUE_APP_ENV;
let ENVCONFIG = {}
if(env === 'test') {
    ENVCONFIG = {
        api:""
    }
}

if(env === 'temp') {
    ENVCONFIG = {
        api:""
    }
}

if(env === 'prod') {
    ENVCONFIG = {
        api:""
    }
}

export default ENVCONFIG;