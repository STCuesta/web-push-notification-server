import {name} from "../package.json";

export default {
    log: {
        level: 'debug',
        logUncaughtException: false,
        pretty: true,
        verboseEvents: false,
        path: `/tmp/${name.toLowerCase().replace(' ', '-')}.log`,//`/var/log/${name.toLowerCase().replace(' ', '-')}.log`,
    },
   
};