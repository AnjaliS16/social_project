const User = require('./model');

exports.addmethod = async (req, res, next) => {
  try {
    const { exp ,des} = req.body;
    console.log('from req.body>>>>', exp,des);

    const newUser = await User.create({
      exp,
      des
      

    })
    res.json({ newuser: newUser})
    console.log('response from add method', newUser);
  }
  catch (error) {
    res.json({ Error: error })
    console.log('error from add method in add.js', error);
  }
}

exports.getmethod = async (req, res) => {
  try {
    const data = await User.findAll();
    const modifiedData = data.map((User) => ({
      id: User.id, 
      exp: User.exp,
      des: User.des,
      
    }));
    res.json({ alluser: modifiedData });
  } catch (error) {
    console.log('Error from add.js get method', error);
    res.json({ Error: error });
  }
};

exports.updatemethod = async (req, res) => {
    const itemId = req.params.id;
    const { comment } = req.body;

    try {
        // Find the item by ID
        const item = await User.findByPk(itemId);

        if (item) {
            // Update the comment field
            item.comment = comment;
            
            // Save the changes to the database
            await item.save();

            res.status(200).json({ message: 'Comment updated successfully' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (err) {
        console.error('Error updating comment:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }

    
};