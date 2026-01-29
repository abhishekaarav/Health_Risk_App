import PredictionHistory from "../models/PredictionHistory.js";

// GET ALL HISTORY
export const getHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const history = await PredictionHistory.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, history });
  } catch (err) {
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
};

// DELETE SINGLE HISTORY
export const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    await PredictionHistory.findOneAndDelete({ _id: id, userId });

    res.status(200).json({
      success: true,
      message: "History deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};
