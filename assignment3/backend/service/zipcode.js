const axios = require('axios')

const USERNAME='sksaqlain25';

const zipcode = {
    find: (req, res) => {
        const URL = `http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=${req.params['zipcode']}&maxRows=5&username=${USERNAME}&country=US`;
        axios
            .get(URL, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                res.send(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },
};

module.exports=zipcode;