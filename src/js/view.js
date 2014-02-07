// Views
App.EditDescView = Ember.TextField.extend({
    didInsertElement: function(){
        this.$().focus();
    }
});

Ember.Handlebars.helper('edit-desc',App.EditDescView);

