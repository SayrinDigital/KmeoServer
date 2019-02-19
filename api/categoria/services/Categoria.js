'use strict';

/**
 * Categoria.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all categorias.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('categoria', params);
    // Select field to populate.
    const populate = Categoria.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Categoria
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      //.populate(filters.populate || populate);
      .populate([{
        path: 'imagen'
      }, {
        path: 'producto',
        populate: [
          {
            path: 'fotos',
            populate: [
              {
                path: 'frontal'
              },
              {
                path: 'extra'
              }
            ]
          },
          {
            path: 'marca'
          }
        ]
      }]);
  },

  /**
   * Promise to fetch a/an categoria.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Categoria.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Categoria
      .findOne(_.pick(params, _.keys(Categoria.schema.paths)))
      .populate([{
        path: 'imagen'
      }, {
        path: 'producto',
        populate: [
          {
            path: 'fotos',
            populate: [
              {
                path: 'frontal'
              },
              {
                path: 'extra'
              }
            ]
          },
          {
            path: 'marca'
          }
        ]
      }]);
  },

  /**
   * Promise to count categorias.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('categoria', params);

    return Categoria
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an categoria.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Categoria.associations.map(ast => ast.alias));
    const data = _.omit(values, Categoria.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Categoria.create(data);

    // Create relational data and return the entry.
    return Categoria.updateRelations({
      _id: entry.id,
      values: relations
    });
  },

  /**
   * Promise to edit a/an categoria.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Categoria.associations.map(a => a.alias));
    const data = _.omit(values, Categoria.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Categoria.update(params, data, {
      multi: true
    });

    // Update relational data and return the entry.
    return Categoria.updateRelations(Object.assign(params, {
      values: relations
    }));
  },

  /**
   * Promise to remove a/an categoria.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Categoria.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Categoria
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Categoria.associations.map(async association => {
        if (!association.via || !data._id) {
          return true;
        }

        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? {
          [association.via]: data._id
        } : {
          [association.via]: {
            $in: [data._id]
          }
        };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? {
          [association.via]: null
        } : {
          $pull: {
            [association.via]: data._id
          }
        };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, {
          multi: true
        });
      })
    );

    return data;
  },

  /**
   * Promise to search a/an categoria.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('categoria', params);
    // Select field to populate.
    const populate = Categoria.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Categoria.attributes).reduce((acc, curr) => {
      switch (Categoria.attributes[curr].type) {
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params._q))) {
            return acc.concat({
              [curr]: params._q
            });
          }

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat({
            [curr]: {
              $regex: params._q,
              $options: 'i'
            }
          });
        case 'boolean':
          if (params._q === 'true' || params._q === 'false') {
            return acc.concat({
              [curr]: params._q === 'true'
            });
          }

          return acc;
        default:
          return acc;
      }
    }, []);

    return Categoria
      .find({
        $or
      })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
