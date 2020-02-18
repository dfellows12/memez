const { db } = require('../util/admin')

exports.getAllMemes = (req, resp) => {
    db
    .collection('memes')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
        let memes = [];
        data.forEach(doc => {
            memes.push({
                memeId: doc.id,
                body: doc.data().body,
                useHandle: doc.data().userHandle,
                createdAt: doc.data().createdAt
            });
        });
        return resp.json(memes)
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({ error: err.code })
    })
}

exports.postOneMeme = (req, resp) => {
    if (req.body.body.trim() === '') {
        return res.status(400).json({ body: 'Body must not be empty' })
    }

   const newMeme = {
       body: req.body.body, 
       userHandle: req.user.handle,
       createdAt: (new Date().toISOString())
   };

    db.collection('memes')
        .add(newMeme)
        .then((doc) => {
            resp.json({ message: `document ${doc.id} created succesfully` })
    })
    .catch(err => {
        resp.status(500).json({ error: 'something went wrong' })
        console.error(err)
    })
}
