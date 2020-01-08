const memberModel = require('../models/memberModel');
//import logger from '../core/logger/app-logger'

const controller = {};

/**
 * Display All Members page(R)
 */
controller.getAll = async (req, res) => {
    try {
        // const members = await memberModel.getAll();
        // //countDocument(members)
        console.log('sending all members...');
        res.render('pages/members/tables',{
            paginatedResult: res.paginatedResults,
            members: res.paginatedResults.members,
            previousPage: res.paginatedResults.previous,
            currentPage: res.paginatedResults.current,
            nextPage: res.paginatedResults.next,
            totalPage: res.paginatedResults.totalPage,
            user: req.user
          })
    }
    catch (err) {
        console.log('Error in getting members- ' + err);
        res.send('Got error in getAll');
    }
}

// /**
//  * Display All Members page(R)
//  */
// controller.getAll = async (req, res) => {
//     try {
//         const members = await memberModel.getAll();
//         //countDocument(members)
//         console.log('sending all members...');
//         res.render('pages/members/tables',{members: members})
//     }
//     catch (err) {
//         console.log('Error in getting members- ' + err);
//         res.send('Got error in getAll');
//     }
// }

/**
 * Display the Add Member page
 */
controller.displayAddMemberPage = (req,res) => {
    try {
        console.log('loading Add Member page . . .');
        res.render('pages/members/add', {
            user: req.user
        });
    }
    catch (err) {
        console.log('Error in loading Add Member page- ' + err);
        res.send('Got error in loading Add Member page');
    }
}

/**
 * Display the Update Member page
 */
controller.displayUpdateMemberPage = async (req, res) => {
    let memberID = req.params.id;

    try {
        const member = await memberModel.getMember(memberID);
        console.log('loading Update Member page . . .');
        res.render('pages/members/update', { 
            member: member,
            user: req.user
        });
    }
    catch (err) {
        console.log('Error in loading Update Member page- ' + err);
        res.send('Got error in loading Update Member page');
    }
}

/**
 * Add Member (C)
 */
// controller.addMember = async (req, res) => {
//     let memberToAdd = memberModel({
//         username: req.body.memberUsername,
//         fullname: req.body.memberFullName,
//         gender: req.body.memberGender,
//         age: req.body.memberAge
//     });

//     try {
//         const savedMember = await memberModel.addMember(memberToAdd);
//         console.log('Adding member . . .');
//         res.redirect('/members/add');
//         //res.send('added: ' + savedMember);
//     }
//     catch(err) {
//         console.log('Error in getting members- ' + err);
//         res.send('Got error in addMember');
//     }
// }

/**
 * Update member (U)
 */
// controller.updateMember = async (req, res) => {
//     let memberDataToUpdate = memberModel({
//         username: req.body.memberUsername,
//         fullname: req.body.memberFullName,
//         gender: req.body.memberGender,
//         age: req.body.memberAge
//     });

//     //member id of the member to update
//     let memberID = req.body.memberID;

//     try {
//         const updatedMember = await memberModel.updateMember(memberID, memberDataToUpdate)
//         console.log('Updating member . . .');
//         res.redirect('/members');
//         //res.send('updated: ' + updatedMember);
//     }
//     catch (err) {
//         console.log('Error in updating member- ' + err);
//         res.send('Got error in updateMember');
//     }
// }

/**
 * Delete member (D)
 */
controller.deleteMember = async (req, res) => {
    let memberID = req.params.id;
    console.log('controller.deleteMember: memberID = ' + memberID);

    try{
        const removedMember = await memberModel.removeMember(memberID);
        console.log('Deleted Member- ' + removedMember);
        res.send(removedMember);
        //res.send('Member successfully deleted');
    }
    catch(err) {
        console.log('Failed to delete member- ' + err);
        //res.send('Delete failed..!');
    }
}

//export default controller;
module.exports = controller;