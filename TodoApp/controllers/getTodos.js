const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
  try {
    const response = await Todo.find({});
    res.status(200).json({
      success: true,
      data: response,
      message: "Entire Todo has been Fetched",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Server Error",
    });
  }
};
