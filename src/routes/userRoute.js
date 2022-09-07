const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const { User, Forum, Mission, Answer, Chat } = require("../db.js");

// create user
router.post("/", async (req, res, next) => {
  const user = req.body;
  console.log(user);
  try {
    if (user.nickname) {
      const userData = await User.findOne({
        where: { nickname: user.nickname.toLowerCase() },
      });
      await User.findOrCreate({
        where: {
          email: user.email,
          nickname: !userData ? user.nickname : user.email,
        },
      });
      res.send("user created");
    } else res.send("fail to create a user");
  } catch (error) {
    console.log(error);
  }
});

// get all users
router.get("/", async (req, res, next) => {
  try {
    let findNickname = req.query.findNickname;
    let email = req.query.email ? req.query.email : req.body.email;
    let nickname = req.query.nickname ? req.query.nickname : req.body.nickname;
    const userData = await User.findAll({
      include: [
        {
          model: Forum,
          attributes: ["id", "title", "deleteFlag"],
        },
        {
          model: Answer,
          attributes: ["id", "comment", "deleteFlag", "like"],
        },
        {
          model: Mission,
          attributes: ["id", "name", "completed", "coinsRewards"],
        },
      ],
    });
    if (email) {
      const userByEmail = userData.filter((e) => e.email === email);
      res.status(200).send(userByEmail);
    } else if (nickname) {
      const userByNickname = userData.filter(
        (e) => e.nickname.toLowerCase() === nickname.toLowerCase()
      );

      userByNickname.length === 0
        ? res.send("User not found")
        : res.status(200).send(userByNickname);
    } else if (findNickname == "nickname") {
      let userDataOnlyNickname = userData.map((e) => e.nickname);
      res.send(userDataOnlyNickname);
    } else res.send(userData);
  } catch (error) {
    next(error);
  }
});

// get a user
router.get("/:id", async (req, res, next) => {
  const idRoom=req.body.idRoom?req.body.idRoom : req.query.idRoom
  const id = req.params.id;
  let chatShow=req.body.chatShow ? req.body.chatShow : req.query.chatShow ? req.query.chatShow : false
  try {
    const userData = await User.findByPk(id, {
      include: [
        {
          model: Forum,
          attributes: ["id", "title", "deleteFlag"],
        },
        {
          model: Answer,
          attributes: ["id", "comment", "deleteFlag", "like"],
        },
        {
          model: Mission,
          attributes: ["id", "name", "completed", "coinsRewards","icon"],
        },
        {model: Chat,
          attributes: ["id", "messages", "deleteFlag"]}
      ],
    });
    if(chatShow==false){
      let chats=[]
      userData.dataValues.chats=chats
    }
    if(idRoom){
      let chats = userData.dataValues.chats.filter(e=>e.id===idRoom)
      userData.dataValues.chats=chats
    }
  
    res.send(userData);
    
  } catch (error) {
    console.log(error);
  }
});

// update a user
router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const allBody = req.body;
  const deleteFriend = req.query.deleteFriend
  const blocked = req.body.blocked
  try {
   
    let userData = await User.findByPk(id);
   
    let addFriends=userData.dataValues.friends


    if (
      allBody.delete == false &&
      !userData.favoriteGames.some((e) => e === allBody.favorite)
    ) {
      userData.favoriteGames = [...userData.favoriteGames, allBody.favorite];
    } else if (allBody.delete == true) {
      userData.favoriteGames = userData.favoriteGames.filter(
        (e) => e !== allBody.favorite
      );
    }

   
      if(deleteFriend=="no" && !addFriends.some(e=>e===allBody.friends)){
        addFriends=[...addFriends, allBody.friends]
      }
      else if (deleteFriend=="yes"){
        addFriends = userData.dataValues.friends.filter(e=>e !== allBody.friends) 
      }
    


      if (blocked=="yes"){
        allBody.blockedUsers=[...userData.dataValues.blockedUsers,allBody.blockedUsers]
      } else if (blocked=="no"){
        allBody.blockedUsers= userData.dataValues.blockedUsers.filter(e=> e != allBody.blockedUsers)
      }
      if(allBody.coins){
          allBody.coins=allBody.coins + userData.dataValues.coins
        }
        console.log(userData.dataValues.coins)
        
    await userData.update({
      friends : addFriends,
      nickname: allBody.nickname,
      email: allBody.email,
      img: allBody.img,
      deleteFlag: allBody.deleteFlag,
      bannedFlag: allBody.bannedFlag,
      password: allBody.password,
      matched_users: allBody.matched_users,
      coins: allBody.coins,
      favoriteGames: userData.favoriteGames,
      servers: allBody.servers,
      missionCompleted: allBody.missionCompleted,
      isAdmin: allBody.isAdmin,
      isSuperAdmin: allBody.isSuperAdmin,
      rating: allBody.rating,
      plan: allBody.plan,
      description: allBody.description,
      blockedUsers:allBody.blockedUsers
    });
    res.status(200).json("user updated");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
