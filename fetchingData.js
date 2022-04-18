const axios = require('axios');
const writejson = require("writejson");

const config = require("./config");

const getData = async () => {
    let page = 1;
    let isEnd = false;

    while ( !isEnd ) {
        console.log(`Get TEI page ${page} ...`);

        const res = await axios({
            method: 'get',
            url: `${config.baseURL}/api/trackedEntityInstances.json?program=${config.baseProgram}&ou=${config.baseOrgUnit}&ouMode=DESCENDANTS&fields=*&totalPages=true&pageSize=${config.basePayloadSize}&page=${page}`,
            headers: {
                'Authorization': `Basic ${config.baseAuthorization}`, 
                'Content-Type': 'application/json'
            }
        })
        .then( res => { 
            if ( res.data.trackedEntityInstances.length > 0 ) {
                writejson(`./originalData/TEIs${page}.json`, { trackedEntityInstances: res.data.trackedEntityInstances })
            }
            else {
                isEnd = true;
            }
        });

        page++;
    }
}

getData();