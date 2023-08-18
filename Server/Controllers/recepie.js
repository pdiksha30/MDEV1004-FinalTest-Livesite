"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRecepie = exports.UpdateRecepie = exports.AddRecepie = exports.DisplayRecepieByID = exports.DisplayRecepieList = exports.ProcessLogout = exports.ProcessLogin = exports.ProcessRegistration = void 0;
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../Models/user"));
const recepie_1 = __importDefault(require("../Models/recepie"));
const index_1 = require("../Util/index");
function SanitizeArray(unsanitizedValue) {
    if (Array.isArray(unsanitizedValue)) {
        return unsanitizedValue.map((value) => value.trim());
    }
    else if (typeof unsanitizedValue === "string") {
        return unsanitizedValue.split(",").map((value) => value.trim());
    }
    else {
        return [];
    }
}
function ProcessRegistration(req, res, next) {
    let newUser = new user_1.default({
        username: req.body.username,
        emailAddress: req.body.EmailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName
    });
    user_1.default.register(newUser, req.body.password, (err) => {
        if (err instanceof mongoose_1.default.Error.ValidationError) {
            console.error('All Fields Are Required');
            return res.json({ success: false, msg: 'ERROR: User Not Registered. All Fields Are Required' });
        }
        if (err) {
            console.error('Error: Inserting New User');
            if (err.name == "UserExistsError") {
                console.error('Error: User Already Exists');
            }
            return res.json({ success: false, msg: 'User not Registered Successfully!' });
        }
        return res.json({ success: true, msg: 'User Registered Successfully!' });
    });
}
exports.ProcessRegistration = ProcessRegistration;
function ProcessLogin(req, res, next) {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            return res.json({ success: false, msg: 'ERROR: User Not Logged in.' });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            const authToken = (0, index_1.GenerateToken)(user);
            return res.json({ success: true, msg: 'User Logged In Successfully!', user: {
                    id: user._id,
                    displayName: user.displayName,
                    username: user.username,
                    emailAddress: user.emailAddress
                }, token: authToken });
        });
        return;
    })(req, res, next);
}
exports.ProcessLogin = ProcessLogin;
function ProcessLogout(req, res, next) {
    req.logout(() => {
        console.log("User Logged Out");
    });
    res.json({ success: true, msg: 'User Logged out Successfully!' });
}
exports.ProcessLogout = ProcessLogout;
function DisplayRecepieList(req, res, next) {
    recepie_1.default.find({})
        .then(function (data) {
        res.status(200).json({ success: true, msg: "Recepie List Displayed Successfully", data: data });
    })
        .catch(function (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "ERROR: Something Went Wrong", data: null });
    });
}
exports.DisplayRecepieList = DisplayRecepieList;
function DisplayRecepieByID(req, res, next) {
    try {
        let id = req.params.id;
        recepie_1.default.findById({ _id: id })
            .then(function (data) {
            if (data) {
                res.status(200).json({ success: true, msg: "Recepie Retrieved by ID Successfully", data: data });
            }
            else {
                res.status(404).json({ success: false, msg: "Recepie ID Not Found", data: data });
            }
        })
            .catch(function (err) {
            console.error(err);
            res.status(400).json({ success: false, msg: "ERROR: Recepie ID not formatted correctly", data: null });
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "ERROR: Something Went Wrong", data: null });
    }
}
exports.DisplayRecepieByID = DisplayRecepieByID;
function AddRecepie(req, res, next) {
    try {
        const ingredients = SanitizeArray(req.body.ingredients);
        const recipe = new recepie_1.default({
            recipeID: req.body.recipeID,
            title: req.body.title,
            origin: req.body.origin,
            ingredients: ingredients,
            instructions: req.body.instructions,
            preparationTime: req.body.preparationTime,
            servingSize: req.body.servingSize,
            difficulty: req.body.difficulty,
            calorieCount: req.body.calorieCount,
            microNutrients: req.body.microNutrients,
            sourceURL: req.body.sourceURL,
            imageURL: req.body.imageURL
        });
        recepie_1.default.create(recipe)
            .then(function () {
            res.status(200).json({ success: true, msg: "Recepie Added Successfully", data: recipe });
        })
            .catch(function (err) {
            console.error(err);
            if (err instanceof mongoose_1.default.Error.ValidationError) {
                res.status(400).json({ success: false, msg: "ERROR: Recepie Not Added. All Fields are required", data: null });
            }
            else {
                res.status(400).json({ success: false, msg: "ERROR: Recepie Not Added.", data: null });
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Something Went Wrong", data: null });
    }
}
exports.AddRecepie = AddRecepie;
function UpdateRecepie(req, res, next) {
    try {
        const id = req.params.id;
        const ingredients = SanitizeArray(req.body.ingredients);
        let recepieToUpdate = new recepie_1.default({
            _id: id,
            recipeID: req.body.recipeID,
            title: req.body.title,
            origin: req.body.origin,
            ingredients: ingredients,
            instructions: req.body.instructions,
            preparationTime: req.body.preparationTime,
            servingSize: req.body.servingSize,
            difficulty: req.body.difficulty,
            calorieCount: req.body.calorieCount,
            microNutrients: req.body.microNutrients,
            sourceURL: req.body.sourceURL,
            imageURL: req.body.imageURL
        });
        recepie_1.default.updateOne({ _id: id }, recepieToUpdate)
            .then(function () {
            res.status(200).json({ success: true, msg: "Recepie Updated Successfully", data: recepieToUpdate });
        })
            .catch(function (err) {
            console.error(err);
            if (err instanceof mongoose_1.default.Error.ValidationError) {
                res.status(400).json({ success: false, msg: "ERROR: Recepie Not Updated. All Fields are required", data: null });
            }
            else {
                res.status(400).json({ success: false, msg: "ERROR: Recepie Not Updated.", data: null });
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Something Went Wrong", data: null });
    }
}
exports.UpdateRecepie = UpdateRecepie;
function DeleteRecepie(req, res, next) {
    try {
        let id = req.params.id;
        recepie_1.default.deleteOne({ _id: id })
            .then(function () {
            res.status(200).json({ success: true, msg: "Recepie Deleted Successfully", data: id });
        })
            .catch(function (err) {
            console.error(err);
            res.status(400).json({ success: false, msg: "ERROR: Recepie ID not formatted correctly", data: null });
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "ERROR: Something Went Wrong", data: null });
    }
}
exports.DeleteRecepie = DeleteRecepie;
//# sourceMappingURL=recepie.js.map