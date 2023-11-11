const healthController = {
    getHealth: (req, res) => {
        res.status(200).send({
            status: 'OK',
            message: 'Server is up and running'
        })
    }
}
module.exports=healthController