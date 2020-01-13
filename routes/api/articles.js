const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator'); 
const User = require('../../models/User');
const Article = require('../../models/Article');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const ExtractContent  = require('../../ExtractContent');
const multiparty = require('connect-multiparty');
const multipartMiddleware = multiparty({uploadDir: __dirname +'/images'});
const fs = require('fs');
const path = require('path');
const paginate = require('jw-paginate');

const uploadDirectory = '/Users/mac/Projects/ReactApps/Article/routes/api/images';

//Cleare the directory of uploads
 function removeImages(directory = uploadDirectory){
  fs.readdir(directory, function(err, files) {
    if(err) throw err;
    for(const file of files){
       fs.unlink(path.join(directory, file), err=>{
          if(err) throw err;
        })
    }
  })
}




//@ todos
/*

 1. POST ARTICLE
 2. DELETE ARTICLE
 3. GET ARTICLE
 4. GET ALL ARTICLES
 5. GET ARTICLES BY SPECIFIC USER
 6. UPDATE ARTICLE

*/


//@route  POST
//@desc   Create a New Article
//@access Private

router.post('/', [auth, multipartMiddleware, [
	check('title', 'Title is required..').not().isEmpty(),
	check('text', 'Text Is Required').not().isEmpty()
	]],
	async (req, res )=>{
		const errors = validationResult(req);

		if(!errors.isEmpty()){
			return res.status(400).json({ errors: errors.array()});
		}

		const { text, title } = req.body;
		var images = req.files.images;
		const author = req.user.id;

		try{
			const content = ExtractContent(text);
			if(images){
				var buffer; 
				var encodedImages = []
				for(let i = 0; i < images.length; i++){
					buffer = await fs.readFileSync(images[i].path);
                     encodedImages.push(buffer.toString('base64'));
				}

            }
			
			const article = new Article({title, content, author});
			article.images = encodedImages;

			await article.save();

			removeImages();

			res.json(article);			

		} catch(err){
			res.status(500).send(err.message);
		}
	});


 
 //@route  GET
//@desc   GET Article by ID
//@access Public

router.get('/:id', async (req, res)=>{
   try{

   	 const article = await Article.findById(req.params.id).populate('author', ['name', 'avatar']);

   	 if(!article){
   	 	return res.status(404).json({errors: [{msg: 'Article Not Found'}]});
   	 }
     
     res.json(article);

   }catch(err){
     if(err.kind === 'ObjectId'){
     	return res.status(400).send('Invalid ID');
     }
     res.status(500).send(err.message);

   }
});



//@route  GET
//@desc   GET All Articles
//@access Public
router.get('/', async (req, res)=>{
	try{
		const page = parseInt(req.query.page) || 1;
		const articles = await Article.find().select('title date').sort({date: -1}).populate('author', ['name', 'avatar']);
		if(!articles){
			return res.status(404).json({errors: [{msg: 'Articles Not Found'}]});
		}
        
        const pageSize = 5;
	    const pager = paginate(articles.length, page, pageSize);

	    //get page of articles
	    const pageOfItems = articles.slice(pager.startIndex, pager.endIndex + 1);

		res.json({pager, pageOfItems});
		
	} catch(err){
		res.status(500).send(err.message);
	}
})



//@route  GET
//@desc   GET Article by User ID
//@access Public
router.get('/author/:userId', async (req, res)=>{
	try{
		const user = await User.findById(req.params.userId);
		if(!user)
			return res.status(404).json({errors: [{msg: 'Author Not Found '}]});

		const articles = await Article.find({author: req.params.userId}).populate('author', ['name', 'avatar']);

		if(!articles)
			return res.status(404).json({errors: [{msg: 'Articles Not Found '}]});

		res.json(articles);
	} catch(err){
		res.status(500).send(err.message);
	}
});








//@route  PUT
//@desc   Update Article 
//@access Private

router.put('/:id', [auth, multipartMiddleware, [
	check('text', 'Text is required').not().isEmpty(),
	check('title', 'Title is required').not().isEmpty()]],
	async (req, res)=>{
		const errors = validationResult(req);

		if(!errors.isEmpty()){
			return res.status(400).json({errors: errors.array()});
		}

		const { text, title } = req.body;

		try{
			var article = await Article.findById(req.params.id);
			
			if(!article)
				return res.status(404).json({errors: [{msg: 'Article Not Found'}]});
			
			if(req.user.id !== article.author.toString()){
				return res.status(401).json({errors: [{msg: 'Authorization Denied'}]});
			}

			
			const images = req.files.images;
			var encodedImages = []

			if(images){
				var buffer; 
				for(var i = 0; i < images.length; i++){
					buffer = await fs.readFileSync(images[i].path);
                    encodedImages.push(buffer.toString('base64'));
				}
            }

            const articleFields = {
            	title: title,
            	content: ExtractContent(text),
            	images: encodedImages
            }
            
            article = await Article.findOneAndUpdate({_id: req.params.id}, {$set: articleFields}, {new: true});

            removeImages();

            res.json(article);

		}catch(err){
			res.status(500).send(err.stack);
		}
});

//@route  DELETE
//@desc   Delete Article 
//@access Private

router.delete('/:id', auth, async (req, res)=>{
	try{
		let article = await Article.findById(req.params.id);

		if(!article){
			return res.status(404).json({errors: [{msg: 'Article Not Found'}]});
		}

		if(req.user.id !== article.author.toString()){
			return res.status(401).json({errors: [{msg: 'Authorization Denied'}]});
		}

		await Article.findOneAndRemove({_id: req.params.id});

		res.send('Deleted Successfully');
	}catch(err){
		res.status(500).send(err.message);

	}
})

//@route PUT api/articles/comment/:id
//@desc   Add comment
//@access Private
router.put('/comment/:id', [auth, [
	check('text', 'Comment Text Is Required').not().isEmpty()]],
	async (req, res)=>{
		const errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(400).json({errors: errors.array()});
		}

		const {text} = req.body;

		try{
			const user = await User.findById(req.user.id);
			
			const article = await Article.findById(req.params.id);

			if(!article){
				return res.status(404).json({errors: [{msg: 'Article Not Found'}]});
			}

			const comment  = {text: text,
			 name: user.name,
			 user: user.id};

		    if(user.avatar){
		    	comment.avatar = user.avatar;
		    }

            article.comments.unshift(comment);

            await article.save();

            res.json(article.comments);


		}catch(err){
			res.status(500).send(err.message);
		}
	});


 //@route DELETE api/articles/comment/:id/:commentID
//@desc   Delete comment
//@access Private
router.delete('/comment/:id/:commentID', auth, async (req, res)=>{

	try{
		    const user = await User.findById(req.user.id);
			
			const article = await Article.findById(req.params.id);

			if(!article){
				return res.status(404).json({errors: [{msg: 'Article Not Found'}]});
			}

			const comment = article.comments.find(c => c.id === req.params.commentID );

			if(!comment){
				return res.status(404).json({errors: [{'msg': 'Comment Not Found'}]});
			}

			if(comment.user.toString() !== req.user.id){
				return res.status(401).json({errors: [{msg: 'Authorization Denied'}]});
			}

			article.comments = article.comments.filter(c => c.id !== comment.id);

			await article.save();

			res.json(article.comments);

	}catch(err){
	   res.status(500).send(err.message);
	}
});


//@route  PUT api/articles/like/:id
//@desc   Like an article
//@access Private
router.put('/like/:id', auth, async(req, res)=>{
	try{
		const article = await Article.findById(req.params.id);
		const user = await User.findById(req.user.id);

		if(!article){
			return res.status(404).json({errors: [{msg: 'Article Not Found'}]});
		}

		const like = article.likes.find(l => l.user.toString() === user.id);
		console.log(like);

		 if(!like){
		 	article.likes.push({user: user.id});
		 }else{
		 	article.likes = article.likes.filter(like => like.user.toString() !== req.user.id);
		 }
        
        await article.save();
		res.json(article.likes);


	}catch(err){
	   res.status(500).send(err.message);

	}
});


//@route  PUT api/articles/unlike/:id
//@desc   Unlike an article
//@access Private
// router.put('/unlike/:id', auth, async(req, res)=>{
// 	try{
// 		const article = await Article.findById(req.params.id);
// 		const user = await User.findById(req.user.id);

// 		if(!article){
// 			return res.status(404).json({errors: [{msg: 'Article Not Found'}]});
// 		}

// 		article.likes = article.likes.filter( like => like.user.toString() !== req.user.id);

// 		await article.save();
		
// 		res.json(article.likes);


// 	}catch(err){
// 	   res.status(500).send(err.message);

// 	}
// });





module.exports = router;
