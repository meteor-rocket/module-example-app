Items.find({}).forEach(function(item) {
    Items.remove(item._id);
});

if (Items.find({}).count() == 0) { // initial items
    for (var i=3; i>0; i--) {
        Items.insert({name: "Oh Yeah    "+i});
    }
}

Meteor.startup(function () {
    // code to run on server at startup
});
