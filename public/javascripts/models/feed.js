Feed = Backbone.Model.extend({

  username: null,

  url: function() {
    return '/tweets?username='+this.get('username')
  }

});
