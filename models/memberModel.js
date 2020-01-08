const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: { 
        type: String, 
        required: true
    },
    firstname: { 
        type: String, 
        required: true
    },
    lastname: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true 
    },
    isActive: { type: Boolean, 
        required: true,
    },
    isBlocked: { type: Boolean, 
        required: true,
    },
});

let MembersModel = mongoose.model('Member', MemberSchema, 'users');

//hàm tự phân trang
MembersModel.paginatedResults = () => {
    return async (req, res, next) => {
        //kiểm tra điều kiện
        if (req.query.page < 1) {
            req.query.page = 1;
        }
        if (req.query.limit < 5) {
            req.query.limit = 5;
        }

        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const PaginatedResult = {};//lưu kết quả

        // Tổng số trang
        PaginatedResult.totalPage = parseInt(await MembersModel.countDocuments())/limit;
        //console.log("PaginatedResult.totalPage = " + PaginatedResult.totalPage)

        PaginatedResult.current = {
            page: page,
            limit: limit,
        }

        if (endIndex < await MembersModel.countDocuments().exec()) {
            PaginatedResult.next = {
                page: page + 1,
                limit: limit,
            };
        }

        if (startIndex > 0) {
            PaginatedResult.previous = {
                page: page - 1,
                limit: limit,
            };
        }

        try {
            PaginatedResult.members = await MembersModel.find().limit(limit).skip(startIndex).exec();
            res.paginatedResults = PaginatedResult;
            next();
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
}

/**
 * Get all the members
 */
MembersModel.getAll = () => {
    console.log('MembersModel.getAll');
    var query = MembersModel.find({});
    return query;//nếu query.exec() thì var promise=query.exec();
}

/**
 * Get an member with <memberID>
 */
MembersModel.getMember = (memberID) => {
    console.log('MembersModel.getMember');
    var query = MembersModel.findById(memberID);
    return query;
}

/**
 * Add a new member
 */
MembersModel.addMember = (memberToAdd) => {
    console.log('MembersModel.addMember');
    return memberToAdd.save();
}

/**
 * Update member
 */
MembersModel.updateMember = (memberID, memberDataToUpdate) => {
    console.log('MemberModel.updateMember');
    var query = MembersModel.findByIdAndUpdate(
        {
            _id: memberID
        },
        {
            $set: {
                username: memberDataToUpdate.username,
                firstname: memberDataToUpdate.firstname,
                lastname: memberDataToUpdate.lastname,
                email: memberDataToUpdate.email,
                isActive: memberDataToUpdate.isActive,
                isBlocked: memberDataToUpdate.isBlocked
            }
        },
        {
            useFindAndModify: false
        }
    )
    return query;
}

/**
 * Remove an member
 */
MembersModel.removeMember = (memberID) => {
    console.log('MembersModel.removeMember(' + memberID + ')');
    return MembersModel.deleteOne({ _id: memberID });
}

/**
 * Export this model
 */
//                              name    schema      collection
//module.exports = mongoose.model('Member',memberSchema,'users');
module.exports = MembersModel;