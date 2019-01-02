const router = require("express").Router();
const axios = require("axios");
const booksController = require("../../controllers/booksController");

/* GET /api/books/ */
router.route("/")
  .get( (req, res) =>  
    axios
      .get("https://www.googleapis.com/books/v1/volumes", {params: {q: req.query.q}})
      .then(response => {
        res.send(response.data.items)
      })
      .catch(err => console.log(err))
    )
  .post(booksController.create);


/* GET /api/books/saved */
router
  .route("/saved")
  .get(booksController.findAll);

/* DELETE /api/books/:id */
router
  .route("/saved/:id")
  .delete(booksController.remove);

module.exports = router;
