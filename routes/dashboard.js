const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../config/db");
const AWS = require('aws-sdk')
const multerS3 = require('multer-s3');
var multer  = require('multer')
const path = require('path')


/*
 * Configure the AWS region of the target bucket.
 * Remember to change this to the relevant region.
 */
AWS.config.region = 'us-east-1'
/*
 * Load the S3 information from the environment variables.
 */
const S3_BUCKET = process.env.S3_BUCKET;

// ======================================
// USING MUTLER-S3 TO UPLOAD IMAGES TO AWS S3
// ======================================
const s3 = new AWS.S3({
  credentials : {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

require('dotenv').config();


// connect the AWS object instance with multer using the multer-s3 module as a storage object.
const uploadS3 = multer({
storage: multerS3({
  s3: s3,
  acl: 'public-read',
  bucket: process.env.S3_BUCKET,
  // metadata() method is used to send additional data about the file we are uploading to Amazon
  metadata: (req, file, cb) => {
    cb(null, {fieldName: file.fieldname})
  },
  key: (req, file, cb) => {
    cb(null, Date.now().toString() + '-' + file.originalname)
  }
})
});

//======================================
// GET THE USER DASHBOARD
//======================================

router.get("/", authorize, async (req, res) => {
  try {
    let  user_id  = req.user.id
    const userInfo = await pool.query(`
				SELECT
				user_account.user_id, user_account.first_name, user_account.last_name, user_account.email, user_account.about_me, user_account.profile_img,
				img_post.img, img_post.description, img_post.img_post_id, img_post.img_likes
				FROM user_account
				LEFT JOIN img_post
				ON user_account.user_id = img_post.id_of_img_poster
				WHERE user_account.user_id = $1`, [user_id])

			const commentCount = await pool.query(`
        SELECT img_commented_on_id, count(img_commented_on_id)
        FROM comments GROUP BY img_commented_on_id`)

			let friendRequest = await pool.query(`
				SELECT
				user_account.first_name, user_account.user_id, friends.friends_id, friends.requesterid, friends.addresseeid, friends.status, friends.friends_id
				FROM user_account
				INNER JOIN friends
				ON  friends.requesterid = user_account.user_id
				WHERE friends.addresseeid = $1 AND friends.status = 'PENDING'`, [user_id])

			const friendReguestRows = friendRequest.rows
      const filteredFriendRequest = Array.from(new Set(friendReguestRows.map(a => a.id)))
                                     .map(id => {
                                       return friendReguestRows.find(a => a.id === id)
                                     })

			let friendsList = await pool.query(`
				SELECT
				user_account.first_name, user_account.user_id, friends.friends_id, friends.requesterid, friends.addresseeid, friends.status, friends.friends_id
				FROM user_account
				INNER JOIN friends
				ON  friends.requesterid = user_account.user_id
				WHERE friends.addresseeid = $1 AND friends.status = 'ACCEPTED'`, [user_id])

    res.json({
        userInfo: userInfo.rows,
        userData: req.user[0],
  			commentCount: commentCount.rows,
  			friendRequest: filteredFriendRequest,
  			friendsList: friendsList.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.get('/userInfo', authorize, async (req,res) => {
  try {
    let user_id = req.user.id
    const getUserInfo = await pool.query(`
      SELECT
      user_id,first_name,last_name,email,about_me,profile_img
      FROM user_account
      WHERE user_id = $1
      `, [user_id])
      res.json({
        getUserInfo: getUserInfo.rows
      })
  } catch (err) {
    console.error(err.message);
  }
})
// UPLOAD A PICTURE IN THE USER DASHBOARD
router.post('/avatar', [authorize, uploadS3.single('upload')], async (req, res, next) => {
    try {
      let user_id = req.user.id
      let  location  = req.file.location;

      const picture = await pool.query(`
        UPDATE user_account
        SET profile_img = $1
        WHERE user_id = $2;`,[location,user_id])
      res.json(picture.rows);

    } catch (err) {
      console.error(err.message);
    }
  })
  // POST AN ABOUT ME
  router.put('/aboutMe', authorize, async (req, res, next) => {
      try {
        let user_id = req.user.id
        const aboutMe = req.body.aboutMe

        const aboutMePost = await pool.query(`
          UPDATE user_account
          SET about_me = $1
          WHERE user_id = $2;`,[aboutMe, user_id])
        res.json(aboutMe);

      } catch (err) {
        console.error(err.message);
      }
    })
    router.put('/firstNameEdit', authorize, async (req, res, next) => {
        try {
          let user_id = req.user.id
          const firstName = req.body.firstName

          const firstNamePost = await pool.query(`
            UPDATE user_account
            SET first_name = $1
            WHERE user_id = $2;`,[firstName, user_id])
          res.json(firstNamePost);

        } catch (err) {
          console.error(err.message);
        }
      })
      router.put('/lastNameEdit', authorize, async (req, res, next) => {
          try {
            let user_id = req.user.id
            const lastName = req.body.lastName

            const lastNamePost = await pool.query(`
              UPDATE user_account
              SET last_name = $1
              WHERE user_id = $2;`,[lastName, user_id])
            res.json(lastNamePost);
          } catch (err) {
            console.error(err.message);
          }
        })
    //POST PICTURES FROM PROFILE PAGE
router.post('/profileImg', [authorize, uploadS3.single('upload')], async (req, res, next) => {
      try {
        let  location  = req.file.location;
        let user_id = req.user.id
        let date_ob = new Date();
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        let fullDate = `${year}-${month}-${date}`

        const picture = await pool.query(`
          INSERT INTO img_post (img, date_posted, id_of_img_poster)
          VALUES ($1, $2, $3)`, [location, fullDate, user_id])
        res.json(picture);

      } catch (err) {
        console.error(err.message);
      }
})
// DELETE PICTURE
router.delete("/deletePicture/:pictureId", async (req, res) => {
    try {
      const pictureId = Number(req.params.pictureId)

      const deleteTodo = await pool.query(
        `DELETE FROM img_post
        WHERE img_post_id = $1`,
        [pictureId]
      );

      res.json("Picture was deleted")
    } catch (err) {
      console.error(err.message);
    }
  });
// ADD A Caption
router.put('/caption', authorize, async(req, res) =>{
  try {
    let { caption, pictureId } = req.body

    const heartPicture = await pool.query(`
      UPDATE img_post
      SET description = $1
      WHERE img_post_id = $2`, [caption, pictureId])

      res.json(heartPicture)
    // UPDATE counters SET current_value = current_value + 1 WHERE counter_name = 'whatever';
  } catch (err) {
    console.error(err.message);

  }
})
// =======================
// GET THE DATA FOR INDIVIDUAL USER IMG PAGE
// =======================
router.get('/individualUserImg/:id', authorize, async (req, res) => {
    try {
      let id = Number(req.params.id)
      const img = await pool.query(`
          SELECT * FROM img_post WHERE img_post_id = $1
        `, [id])

      const individualUserImg = await pool.query(`
        SELECT * FROM img_post
        FULL JOIN comments
        ON img_post.img_post_id = comments.img_commented_on_id
        WHERE img_post.img_post_id = $1`, [id])

      const userNames = await pool.query(`SELECT user_id, first_name FROM user_account`)
      const commentCount = await pool.query(`
        SELECT img_commented_on_id, count(img_commented_on_id)
        FROM comments
        GROUP BY img_commented_on_id`)
        res.json({
          img: img.rows[0],
          individualUserImg: individualUserImg.rows,
          userNames: userNames.rows,
          commentCount: commentCount.rows
        })
    } catch (err) {
      console.error(err.message);
    }
  })

  router.get('/newsfeed/:id', authorize, async (req, res) => {
    try {
      const newsFeed = await pool.query(`
        SELECT
        img_post.img, img_post.description, img_post.img_likes, img_post.img_post_id,
        user_account.first_name, user_account.user_id, user_account.profile_img
        FROM img_post
        LEFT JOIN user_account
        ON img_post.id_of_img_poster = user_account.user_id
        ORDER BY img_post.img_post_id DESC
        `)
      const commentCount = await pool.query(`
        SELECT img_commented_on_id, count(img_commented_on_id)
        FROM comments
        GROUP BY img_commented_on_id`)
      res.json({
        userData: req.user[0],
        newsFeed: newsFeed.rows,
        commentCount: commentCount.rows,
      })
    } catch (err) {
      console.error(err.message);

    }
  })
  // ===============================
// ROUTE TO IDIVIDUAL PICTURE PAGE
// ===============================
router.get('/individualPicture/:picId', authorize, async (req, res) => {
  try {
    let id = Number(req.params.picId)
    let user_id = req.user.id

    const user_account = await pool.query(`
      SELECT * FROM user_account
      WHERE user_id = $1
      `, [user_id])

      const backUpIndividualPicture = await pool.query(`
        SELECT * FROM img_post
        FULL JOIN comments
        ON img_post.img_post_id = comments.img_commented_on_id
        WHERE img_post.img_post_id = $1`, [id])
        // console.log('BACKUP',backUpIndividualPicture.rows);

    const individualPicture = await pool.query(`
      SELECT * FROM img_post
      FULL JOIN comments
      ON img_post.img_post_id = comments.img_commented_on_id
      INNER JOIN user_account
      ON comments.commenter_user_id = user_account.user_id
      WHERE img_post.img_post_id = $1`, [id])
    const userNames = await pool.query(`
      SELECT user_id, first_name, profile_img
      FROM user_account`)
    const commentCount = await pool.query(`
      SELECT img_commented_on_id, count(img_commented_on_id)
      FROM comments GROUP BY img_commented_on_id`)

    res.json({
      user_account: user_account.rows,
      individualPicture: individualPicture.rows,
      backUpIndividualPicture: backUpIndividualPicture.rows,
      userNames: userNames.rows,
      commentCount: commentCount.rows
    })
  } catch (err) {
    console.error(err.message);
  }
})

// =============================
// POSTING A COMMENT
// =============================
  router.post('/comment', authorize, async (req, res) => {
    try {
      let commenter_user_id = req.user.id
      const { comment, pictureId } = req.body
      let url = req.headers.referer;
      let image_commented_on_id;
      for(let i = url.length - 1; i > 0; i--){
        if(url[i] == '/'){
          img_commented_on_id = Number(url.slice(i+1))
          break;
        }
      };
      const commentPost = await pool.query(`
        INSERT INTO comments (comment, commenter_user_id, img_commented_on_id)
        VALUES ($1, $2, $3)`, [comment, commenter_user_id, pictureId])
      res.json(commentPost.rows)
    } catch (err) {
      console.error(err.message);
    }
  })
// ADD A HEART
  router.put('/addHeart', authorize, async(req, res) =>{
    try {
      let pictureId = req.body.img_post_id
      const heartPicture = await pool.query(`
        UPDATE img_post
        SET img_likes = img_likes + 1
        WHERE img_post_id = $1`, [pictureId])
        res.json(heartPicture)
    } catch (err) {
      console.error(err.message);

    }
  })

  // DELETE A Comment
  router.delete("/deleteComment/:id", authorize, async (req, res) => {
    try {
      const { id } = req.params;
      const deleteComment = await pool.query(
        "DELETE FROM comments WHERE comments_id = $1 AND commenter_user_id = $2 RETURNING *",
        [id, req.user.id]
      );

      if (deleteComment.rows.length === 0) {
        return res.json("This is not your comment");
      }

      res.json("Comment was deleted");
    } catch (err) {
      console.error(err.message);
    }
  });


  // =============================
// REPLY TO A COMMENT
// =============================
router.get('/replies/:commentRepliedToId', authorize, async(req, res) => {
  try {
    const { commentRepliedToId } = req.params
    const userId = req.user.id
    let user_id = req.user.id

    const user_account = await pool.query(`
      SELECT * FROM user_account
      WHERE user_id = $1
      `, [user_id])

    const comment = await pool.query(`
      SELECT * FROM comments
      WHERE comments_id = $1`,
      [commentRepliedToId])
    const replies = await pool.query(`
      SELECT
      reply, reply_likes, reply_user_id, comment_replied_to_id, img_replied_to_id
      FROM comment_replies
      WHERE comment_replied_to_id = $1`,
      [commentRepliedToId])
    const fullReplyInfo = await pool.query(`
      SELECT
      comment_replies.comment_reply_id, comment_replies.reply, comment_replies.reply_likes, comment_replies.reply_user_id, comment_replies.comment_replied_to_id, comment_replies.img_replied_to_id,
      user_account.user_id, user_account.first_name, user_account.last_name
      FROM comment_replies
      LEFT JOIN user_account
      ON comment_replies.reply_user_id = user_account.user_id
      WHERE comment_replies.comment_replied_to_id = $1`,
      [commentRepliedToId])
    const userNames = await pool.query(`
      SELECT user_id, first_name
      FROM user_account`)
    res.json({
      user_account: user_account.rows,
      fullReplyInfo: fullReplyInfo.rows,
      replies: replies.rows,
      userNames: userNames.rows,
      comment: comment.rows
    })
  } catch (err) {
    console.error(err.message);
  }
})

router.post('/commentReply',authorize, async (req, res) => {
    try {
      const reply_user_id = req.user.id
      const reply = req.body.reply
      const img_replied_to_id = Number(req.body.img_replied_to_id)
      const comment_replied_to_id = req.body.comment_replied_to_id

      const replyPost = await pool.query(`
        INSERT INTO comment_replies
        (reply, reply_user_id, comment_replied_to_id, img_replied_to_id)
        VALUES ($1, $2, $3, $4)`,
        [reply, reply_user_id, comment_replied_to_id, img_replied_to_id])

      res.json(replyPost)
    } catch (err) {
      console.error(err.message);
    }
  })

  // DELETE A Comment
  router.delete("/deleteReply/:id", authorize, async (req, res) => {
    try {
      const { id } = req.params;
      const deleteComment = await pool.query(
        "DELETE FROM comment_replies WHERE comment_reply_id = $1 AND reply_user_id = $2 RETURNING *",
        [id, req.user.id]
      );

      if (deleteComment.rows.length === 0) {
        return res.json("This is not your Reply");
      }

      res.json("Reply was deleted");
    } catch (err) {
      console.error(err.message);
    }
  });

  // ==============
  // Send FriendRequest
  // =============

  router.post('/individualPicture/friendReguest', authorize, async (req, res) => {
    try {
      const requesterid = req.user.id;
      const addresseeid = req.body.id_of_img_poster;
      const status = 'PENDING'

      //I must await to recieve the promise ;-]
      const friendReguest = await pool.query(`
        INSERT INTO
        friends (requesterid, addresseeid, status)
        VALUES ($1, $2, $3)`,
        [requesterid, addresseeid, status])

        res.json(friendReguest)
    } catch (err) {
      console.error(err.message);
    }
  })

  // ==============
  // Accept FriendRequest
  // =============
  router.put('/acceptRequest', async (req, res) => {
    try {
      const friends_id = Number(req.body.friends_id)
      const updateFriendStatus = await pool.query(`
        UPDATE friends
        SET status = 'ACCEPTED'
        WHERE friends_id = $1`,
        [friends_id])
        res.json(updateFriendStatus)
    } catch (err) {
      console.error(err.message);
    }
  })

  // ==============
  // Decline FriendRequest
  // =============
  router.delete('/unFollow', authorize, async (req, res) => {
    try {
      let  user_id  = req.user.id
      const friends_id = req.body.friendsId

      const updateFriendStatus = await pool.query(`
        DELETE FROM friends
        WHERE addresseeid = $1 AND requesterid = $2`,
        [friends_id, user_id])
        res.json(updateFriendStatus)
    } catch (err) {
      console.error(err.message);
    }
  })

  router.get('/getFollowers', authorize, async(req, res) => {
    try {
      let  user_id  = req.user.id
      const allFollowers = await pool.query(`
        SELECT * FROM friends;
        `)
        const allFollowersRows = allFollowers.rows

        let whoImFollowing = await pool.query(`
  				SELECT
  				user_account.first_name, user_account.user_id, user_account.about_me, user_account.profile_img, friends.friends_id, friends.requesterid, friends.addresseeid, friends.status, friends.friends_id
  				FROM user_account
  				INNER JOIN friends
  				ON  friends.addresseeid = user_account.user_id
  				WHERE friends.requesterid = $1`, [user_id])
          const whoImFollowingRows = whoImFollowing.rows
          const filteredWhoImFollowingRows = Array.from(new Set(whoImFollowingRows.map(a => a.addresseeid)))
                                   .map(id => {
                                     return whoImFollowingRows.find(a => a.addresseeid === id)
                                   })

          let myFollowers = await pool.query(`
    				SELECT
    				user_account.first_name, user_account.user_id, user_account.about_me, user_account.profile_img, friends.friends_id, friends.requesterid, friends.addresseeid, friends.status, friends.friends_id
    				FROM user_account
    				INNER JOIN friends
    				ON  friends.requesterid = user_account.user_id
    				WHERE friends.addresseeid = $1`, [user_id])
            const myFollowersRows = myFollowers.rows
            const filteredMyFollowersRows = Array.from(new Set(myFollowersRows.map(a => a.requesterid)))
                                     .map(id => {
                                       return myFollowersRows.find(a => a.requesterid === id)
                                     })

        res.json({
          allFollowers: allFollowersRows,
          myFollowers: filteredMyFollowersRows,
          whoImFollowing:filteredWhoImFollowingRows
        })
    } catch (err) {
      console.error(err.message);
    }
  })

  router.get('/friend/:friendId', authorize, async(req, res) => {
    try {
      let  user_id  = req.user.id
      const { friendId } = req.params;
      const friend = await pool.query(`
        SELECT * FROM user_account
        WHERE user_id = $1`,[friendId])
      const friendsPicture = await pool.query(`
        SELECT * FROM img_post
        WHERE id_of_img_poster = $1`, [friendId])
      const commentCount = await pool.query(`
        SELECT img_commented_on_id, count(img_commented_on_id)
        FROM comments
        GROUP BY img_commented_on_id`)
      res.json({
        // userData: req.user[0],
        friend: friend.rows[0],
        friendsPicture: friendsPicture.rows,
        commentCount: commentCount.rows,
        user_id: user_id
        })
    } catch (err) {
      console.error(err.message);
    }
  })

  router.delete('/deleteAccount', authorize, async(req, res) => {
    try {
      let  user_id  = req.user.id
      let email = req.body.email
      console.log('BODY', req.body.email);
      console.log('useID', req.user.id);
        const deleteUserAccount = await pool.query(`
          DELETE FROM user_account
          WHERE user_id = $1 AND email = $2
          `,[user_id, email])

        res.setTimeout(500)
    } catch (err) {
      console.error(err.message);
    }
  })

  // cathc all method
    router.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "..", "client/build/index.html"))
    })

module.exports = router;
