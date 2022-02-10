var config = {
    user: 'dotnet_dev',
    password: 'Esmsys-20$20',
    server: 'mssql.esmsys.in', 
    database: 'GeoLocation-dev',
    options:{
        trustedconnection: true,
        // enableArithAbort : true, 
        trustServerCertificate: true
       
    },
    port : 14251
     
      
      
};

module.exports=config;