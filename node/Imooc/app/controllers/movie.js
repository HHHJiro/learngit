var _ = require('underscore')
var Movie = require('../models/movie')
	//detail page
	exports.detail = function(req, res){
	var id = req.params.id;

	Movie.findById(id,function(err,movie){
	res.render('detail',{
		title: 'imooc '+ movie.title,
		movie:movie
	})
	})

	}

	//admin update movie
	exports.update = function(req,res){
	var id = req.params.id;
	if (id) {
		Movie.findById(id, function(err,movie){
			res.render('admin',{
				title:'imooc 后台更新页',
				movie:movie
			})
		})
	}
	}


	//admin save movie
	exports.save =  function(req,res){
	var id = req.body.movie._id
	var movieObj = req.body.movie
	var _movie

	if (id !== 'undefined') {
		
		Movie.findById(id, function(err,movie){
			if (err) {
				console.log(err)
			}
			//underscore 更新字段
			_movie = _.extend(movie,movieObj)

			_movie.save(function(err,movie){
				if (err) {
					console.log(err)
				}

				res.redirect('/movie/' + movie._id)
			})
		})
	}
	else{
		console.log("in here")
		_movie = new Movie({
			doctor:movieObj.doctor,
			title:movieObj.title,
			country:movieObj.country,
			language:movieObj.language,
			year:movieObj.year,
			poster:movieObj.poster,
			summary:movieObj.summary,
			flash:movieObj.flash
		})

		_movie.save(function(err,movie){
			if (err) {
				console.log(err)
			}

			res.redirect('/movie/' + movie._id)
		})
	}
	}

	//admin page

	exports.new = function(req, res){
	res.render('admin',{
		title: 'imooc 后台录入页',
		movie:{
			title:'',
			doctor:'',
			country:'',
			year:'',
			poster: '',
			flash: '',
			summary:'',
			language:''
			}
	})
	}

	//list page
	exports.list = function(req, res){
	Movie.fetch(function(err, movies){
		if(err){
			console.log(err)
		}
		res.render('list',{
			title: 'imooc 表单页',
			movies:movies
		})
	})
	}

	//list delete move
	exports.del = function(req, res){
	var id = req.query.id
	console.log("delete")
	if (id) {
		Movie.remove({_id:id},function(err,movie){
			if (err) {
				console.log(err)
			}
			else{
				res.json({success:1})
			}
		})
	}
	}