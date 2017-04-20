exports.add = function (req, res, a, b) {
    //intentional blocking delay
    var seconds = 3; //3 second delay
    var waitTill = new Date(new Date().getTime() + seconds * 1000);
    while(waitTill > new Date()){};

    try {
        if(!a || !b) {
            throw new Error("Input not valid");
        }
        else {
            res.json(((a-0) + (b-0)));
        }
    } 
    catch (ex) {
        res.status(500).json({ msg: ex.message });
    }    
};

exports.multiply = function (req, res, a, b) {
    //intentional blocking delay
    var seconds = 3; //3 second delay
    var waitTill = new Date(new Date().getTime() + seconds * 1000);
    while(waitTill > new Date()){};

    try {
        if(!a || !b) {
            throw new Error("Input not valid");
        }
        else {
            res.json((a*b));
        }
    } 
    catch (ex) {
        res.status(500).json({ msg: ex.message });
    }    
};
