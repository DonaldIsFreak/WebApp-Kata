// Controllers
App.BooksController = Ember.ArrayController.extend({
    actions: {
        add: function(){
            var title = this.get('newTitle');
            var isbn = this.get('newISBN');
            var description = this.get('newDesc');
            var book = this.store.createRecord('book',{
                title : title,
                isbn : isbn,
                description : description
            });
            book.save();
            this.set('newTitle','');
            this.set('newISBN','');
            this.set('newDesc','');
        }
    }
});

App.BookController = Ember.ObjectController.extend({
    isEditing: false,
    isRevming: false,
    actions: {
        editDesc: function(){
            this.set('isEditing',true);
        },
        remove: function(){
            this.toggleProperty('isRemoving');
        },
        update: function(){
            this.set('isEditing',false);
            this.get('model').save();
        },
        confirmRemove: function(){
            var books = this.get('model');
            books.deleteRecord();
            books.save();
            this.set('isRemoving',false);
        },
        cancelRemove: function(){
            this.set('isRemoving',false);
        }
    }
});

