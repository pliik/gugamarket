# Gugamarket REST API framework

Gugamarket is a fullstack REST API framework.

Prod Demo: http://www.gugamarket.com/

Available end points documentation: http://www.gugamarket.com/docs/ui-api/

Built with:

  Node
  
  Swagger (REST Api documentation)
  
  Express (MVC Framework)
  
  Mongoose (MongoDB ORM)
  
  mongoose-nested-set (Hierarquical Catalog Tree) https://github.com/groupdock/mongoose-nested-set
  
  Jade (Template)
  
  Passwordless (token email authentication)
  
  Mocha (Unit Testing)

# Install via Npm:

https://www.npmjs.com/package/gugamarket

npm install gugamarket

# Start project (Linux):

git clone https://github.com/pliik/gugamarket.git

cd gugamarket

npm install

npm install -g supervisor

supervisor app.js

Pliik server listening on port 127.0.0.1:3000 - Powered by EXPRESS 4!

# Demo

http://www.gugamarket.com

# RHC ready
Openshift - compatible. 

## Todo

Protect all CRUD nodes.

## Contributing
 
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
