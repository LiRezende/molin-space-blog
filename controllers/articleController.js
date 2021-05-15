const Article = require('../models/article');

const article_index = (req,res) => {
    Article.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('article/index', { articles: result, title: 'All Articles' });
      })
      .catch(err => {
        res.status(404).render('404', { title: 'Page not found.' });
      });
}

const article_details = (req, res) => {
    const id = req.params.id;
    Article.findById(id)
      .then(result => {
        res.render('article/details', { article: result, title: 'Article Details' });
      })
      .catch(err => {
        res.status(404).render('404', { title: 'Page not found.' });
      });
  }
  
  const article_create_get = (req, res) => {
    res.render('article/create', { title: 'Create a new article' });
  }
  
  const article_create_post = (req, res) => {
    const blog = new Article(req.body);
    blog.save()
      .then(result => {
        res.redirect('article/articles');
      })
      .catch(err => {
        res.status(404).render('404', { title: 'Page not found.' });
      });
  }
  
  const article_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/articles' });
      })
      .catch(err => {
        res.status(404).render('404', { title: 'Page not found.' });
      });
  }
  
  module.exports = {
    article_index, 
    article_details, 
    article_create_get, 
    article_create_post, 
    article_delete
  }