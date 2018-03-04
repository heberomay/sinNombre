//User
Meteor.publish("allUsers", function() {
    var cursor = Meteor.users.find({});
    return cursor;
});
Meteor.users.allow({
        "update": function (userId, doc) {
            return true; 
        }
    });
Meteor.users.allow({
        "remove": function (userId, doc) {
            return true; 
        }
    });
Meteor.users.allow({
        "insert": function (userId, doc) {
            return true; 
        }
    });
//User Role
Meteor.publish("userRole", function() {
    return userRole.find();
});
//User2Role
Meteor.publish("user2Role", function() {
    return user2Role.find();
});

//services
Meteor.publish("allServices", function() {
    return services.find();
});