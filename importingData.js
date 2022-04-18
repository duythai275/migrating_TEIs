const axios = require('axios');
const writejson = require("writejson");

const config = require("./config");

const importing = async () => {
    let file = 1;
    let result = [];

    while ( file < 73 ) {
        console.log(`Importing Events file ${file} ...`)
        let data = require(`./updatedData/Events${file}.json`);
        const res = await axios({
            url: `${config.destinationURL}/api/events?strategy=CREATE_AND_UPDATE`,
            method: 'post',
            headers: { 
                'Authorization': `Basic ${config.destinationAuthorization}`, 
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        })
        .then(function (response) {
            result.push({
                file: file,
                res: {
                    imported: response.data.response.imported,
                    updated: response.data.response.updated,
                    deleted: response.data.response.deleted,
                    ignored: response.data.response.ignored
                }
            });
        })
        .catch(function (error) {
            result.push({
                file: file,
                res: error.response.data
            });
        });
        file++;
    }

    
    writejson(`./result/resultEvents.json`, { result: result });
}

importing();