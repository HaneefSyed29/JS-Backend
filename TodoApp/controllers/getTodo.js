const Todo = require("../models/Todo");

exports.getTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Todo.findById({ _id: id });
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "No Data Found with this ID",
      });
    } else {
      res.status(200).json({
        success: true,
        data: response,
        message: "Data fetched Successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Server Issues",
    });
  }
};
