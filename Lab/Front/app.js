var http = require('http')
var dns = require('dns'); 

var server = http.createServer(function (request, response) {
    var nodeName = process.env.Fabric_NodeName; 
    var backDNS = process.env.Back_DNSName;
    var ipAddress = ''; 
    var port = 8080; 
    
    dns.resolve(backDNS, function (errors, ipAddresses){
        if (errors) {
            response.end(errors.message);
        }
        else  {
            ipAddress = ipAddresses[0];

            var options = {
                host: ipAddress,
                port: port
            }; 

            callback = function(res) {
                var str = 'Python backend is running on: ';
                
                res.on('data', function (chunk) {
                    str += chunk;
                }); 

                res.on('end', function() {
                    str += "  \nNodeJs frontend is running on: ";
                    str += nodeName;
                    response.end(str);
                });
            }

            var req = http.request(options, callback); 

            req.on("error", err => {
                response.end(err.message);
            });

            req.end();
        }

    });

    request.on('error', err => {
        response.end(err.message);
    })
});

server.listen(8000);