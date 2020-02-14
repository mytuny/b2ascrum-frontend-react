const config = {
    API_BASE_URL: 'http://localhost:5000/api'
};

module.exports = function(name) {
    if( name && name in config )
        return config[name]; 
};