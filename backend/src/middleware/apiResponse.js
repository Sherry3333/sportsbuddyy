export default function apiResponse(req, res, next) {
    res.apiSuccess = (data, message = "Success", code = 200) => {
      res.status(200).json({ code, message, data });
    };
    
    res.apiError = (message = "Error", code = 500) => {
      res.status(500).json({ code, message });
    };
    
    next();
  }