export const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    console.log(file);
    
    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};
