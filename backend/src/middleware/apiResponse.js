export default function apiResponse(req, res, next) {
    res.apiSuccess = (data, message = "Success", code = 200) => {
      res.status(200).json({ code, message, data });
    };
    
    res.apiError = (message = "Error", code = 500) => {
      res.status(500).json({ code, message });
    };

    //401 Unauthorized
    res.apiUnauthorized = (message = "Unauthorized", code = 401) => {
      res.status(401).json({ code, message });
    };
    
    //403 Forbidden
    res.apiForbidden = (message = "Forbidden", code = 403) => {
      res.status(403).json({ code, message });
    };
    
    next();
  }