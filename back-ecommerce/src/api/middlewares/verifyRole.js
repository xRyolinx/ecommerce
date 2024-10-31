import ROLE from "../../constants/role.js";

const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            // if not auth
            if (!req.userId || !req.role) {
                return res.status(401).send("You are not authenticated");
            }

            // if role allows
            if (allowedRoles.includes(req.role)) {
                return next();
            }

            // if self
            else if (allowedRoles.includes(ROLE.SELF)) {
                // get id from req and route
                const userId = req.userId
                const routeId = req.params.id;
                
                // if not the same
                if (userId == routeId) {
                    return next();
                }
            }
            // no role and not self
            else {
                return res.status(401).send("Access not allowed");
            }
        }
        catch(e) {
            return res.status(400).send("Une erreur est survenue");
        }
    };
};


export default verifyRole;