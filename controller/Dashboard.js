var Config   = require('../config/main.js');

exports.init = function(req, res){
  res.render('dashboard',
  	{
  		title: Config.market,
      desc: Config.desc
  		//,name: req.params.name
  	});
};
