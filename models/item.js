const mongoose = require('mongoose');
const marked = require('marked');
const Schema = mongoose.Schema;
const Prism = require('prismjs');
const Liquid = require('liquidjs');
const engine = new Liquid();

// Register highlight tag
engine.registerTag('highlight', {
  parse: function(tagToken, remainTokens) {
    this.str = tagToken.args;
    this.tpl = [];
    const stream = engine.parser.parseStream(remainTokens)
      .on('start', () => {
        console.log(this);
      })
      .on('tag:endhighlight', () => stream.stop())
      .on('template', (tpl) => this.tpl.push(tpl))
      .on('end', () => {
        throw new Error(`tag ${tagToken.raw} not closed`);
      });

    stream.start();
  },
  render: async function(scope, hash) {
    let code = '';
    for (let i = 0; i < this.tpl.length; i++) {
      const block = this.tpl[i].raw;
      code += block;
    }
    const prismCode = Prism.highlight(
      code, Prism.languages[this.str], this.str
    );
    return `<pre><code class="language-${this.str}">${prismCode}</code></pre>`;
  },
});

const ItemSchema = new Schema({
  title: {
    required: 'Please enter a name',
    trim: true,
    type: String,
  },
  handle: {
    required: 'Please enter a handle',
    trim: true,
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  excerpt: {
    type: String,
  },
  collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }],
  tags: {
    type: Array,
  },
});

ItemSchema.index({ handle: 1, tags: 1 });

ItemSchema.statics.getFlat = function(find, callback) {
  Item
    .findOne(find)
    .exec(function(err, item) {
      if (err) {
        return callback(err);
      }
      if (!item) {
        return callback('No item found');
      }
      const returnItem = {
        title: item.title,
        handle: item.handle,
        id: item.id,
        description: item.description,
        excerpt: item.excerpt,
        tags: item.tags,
        collections: item.collections ? item.collections.map((col) => {
          return col.toString();
        }) : [],
      };
      return callback(null, returnItem);
    });
};

ItemSchema.statics.getFront = function(find, callback) {
  Item
    .findOne(find)
    .exec(function(err, item) {
      if (err) {
        return callback(err);
      }
      if (!item) {
        return callback('No item found');
      }
      engine
        .parseAndRender(item.description)
        .then((content) => {
          const returnItem = {
            title: item.title,
            handle: item.handle,
            id: item.id,
            content: marked(content),
            excerpt: item.excerpt,
            tags: item.tags,
            collections: item.collections ? item.collections.map((col) => {
              return col.toString();
            }) : [],
          };
          return callback(null, returnItem);
        });
    });
};

ItemSchema.statics.getManyFlat = function(find, limit, callback) {
  Item
    .find(find)
    .limit(limit)
    .exec(function(err, items) {
      if (err) {
        return callback(err);
      }
      const returnItems = items.map((item) => ({
        title: item.title,
        handle: item.handle,
        id: item.id,
        description: item.description,
        excerpt: item.excerpt,
        tags: item.tags,
        collections: item.collections ? item.collections.map((col) => {
          console.log(col);
          if (!col) {
            return;
          }
          return col.toString();
        }) : [],
      }));
      return callback(null, returnItems);
    });
};

const Item = mongoose.model('Item', ItemSchema);
module.exports.Item = Item;
