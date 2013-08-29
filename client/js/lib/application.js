// Lewis (client)

window.App = Ember.Application.create({
    LOG_TRANSITIONS: true
});

App.RESTAdapter = DS.RESTAdapter.extend({

    url: 'http://localhost:3000',

    namespace: 'api',

    serializer: DS.RESTSerializer.extend({

        init: function()
        {
            this._super();

            this.configure('plurals', {
            	restaurant: 'restaurants',
                list: 'lists',
                task: 'tasks'
            });
        },

        primaryKey: function(type) {
            return '_id';
        },

        // the default Ember Serializer converts IDs to numbers meaning all-numeric
        // MongoDB IDs are serialized in the URL like `5.1755256517945e`

        // https://github.com/emberjs/data/blob/master/packages/ember-data/lib/system/serializer.js
        // serializeId: function(id) {
        //     if (isNaN(id)) { return id; }
        //     return +id;
        // }
        serializeId: function(id) {
            return id.toString();
        },

        // Ember Data only serializes hasMany relationships if they're embedded records
        //
        // Macaque.RESTAdapter.map('Macaque.Task', {
        //     'lists': { embedded: 'always' }
        // });
        //
        // Serialize hasMany IDs to mimic sideloaded relationships
        //
        addHasMany: function(hash, record, key, relationship)
        {
            if (/_ids$/.test(key)) {
                hash[key] = [];
                record.get(this.pluralize(key.replace(/_ids$/, ''))).forEach(function(item) {
                    hash[key].push(item.get('id'));
                });
            }
            return hash;
        }
    })
});

App.Store = DS.Store.extend({
    revision: 13,
    adapter: App.RESTAdapter
});
