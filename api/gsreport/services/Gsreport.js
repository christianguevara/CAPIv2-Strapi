/* global Gsreport */
'use strict';

/**
 * Gsreport.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

// Strapi utilities.
const utils = require('strapi-hook-bookshelf/lib/utils/');
const { convertRestQueryParams, buildQuery } = require('strapi-utils');


module.exports = {

  /**
   * Promise to fetch all gsreports.
   *
   * @return {Promise}
   */

  fetchAll: (params, populate) => {
    // Select field to populate.
    const withRelated = populate || Gsreport.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias);

    const filters = convertRestQueryParams(params);

    return Gsreport.query(buildQuery({ model: Gsreport, filters }))
      .fetchAll({ withRelated })
      .then(data => data.toJSON());
  },

  /**
   * Promise to fetch a/an gsreport.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Gsreport.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias);

    return Gsreport.forge(_.pick(params, 'id')).fetch({
      withRelated: populate
    });
  },

  /**
   * Promise to count a/an gsreport.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Bookshelf.
    const filters = convertRestQueryParams(params);

    return Gsreport.query(buildQuery({ model: Gsreport, filters: _.pick(filters, 'where') })).count();
  },

  /**
   * Promise to add a/an gsreport.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Gsreport.associations.map(ast => ast.alias));
    const data = _.omit(values, Gsreport.associations.map(ast => ast.alias));

    // Check blacklists (Client & CMDR)
    await strapi.api.excludeclient.services.excludeclient.blockClient(data.clientVersion);
    await strapi.api.excludecmdr.services.excludecmdr.blockCMDR(data.cmdrName);

    // Create entry with no-relational data.
    const entry = await Gsreport.forge(data).save();

    // Create relational data and return the entry.
    return Gsreport.updateRelations({ id: entry.id , values: relations });
  },

  /**
   * Promise to edit a/an gsreport.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Gsreport.associations.map(ast => ast.alias));
    const data = _.omit(values, Gsreport.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Gsreport.forge(params).save(data);

    // Create relational data and return the entry.
    return Gsreport.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an gsreport.
   *
   * @return {Promise}
   */

  remove: async (params) => {
    params.values = {};
    Gsreport.associations.map(association => {
      switch (association.nature) {
        case 'oneWay':
        case 'oneToOne':
        case 'manyToOne':
        case 'oneToManyMorph':
          params.values[association.alias] = null;
          break;
        case 'oneToMany':
        case 'manyToMany':
        case 'manyToManyMorph':
          params.values[association.alias] = [];
          break;
        default:
      }
    });

    await Gsreport.updateRelations(params);

    return Gsreport.forge(params).destroy();
  },

  /**
   * Promise to search a/an gsreport.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Bookshelf.
    const filters = strapi.utils.models.convertParams('gsreport', params);
    // Select field to populate.
    const populate = Gsreport.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias);

    const associations = Gsreport.associations.map(x => x.alias);
    const searchText = Object.keys(Gsreport._attributes)
      .filter(attribute => attribute !== Gsreport.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['string', 'text'].includes(Gsreport._attributes[attribute].type));

    const searchInt = Object.keys(Gsreport._attributes)
      .filter(attribute => attribute !== Gsreport.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['integer', 'decimal', 'float'].includes(Gsreport._attributes[attribute].type));

    const searchBool = Object.keys(Gsreport._attributes)
      .filter(attribute => attribute !== Gsreport.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['boolean'].includes(Gsreport._attributes[attribute].type));

    const query = (params._q || '').replace(/[^a-zA-Z0-9.-\s]+/g, '');

    return Gsreport.query(qb => {
      if (!_.isNaN(_.toNumber(query))) {
        searchInt.forEach(attribute => {
          qb.orWhereRaw(`${attribute} = ${_.toNumber(query)}`);
        });
      }

      if (query === 'true' || query === 'false') {
        searchBool.forEach(attribute => {
          qb.orWhereRaw(`${attribute} = ${_.toNumber(query === 'true')}`);
        });
      }

      // Search in columns with text using index.
      switch (Gsreport.client) {
        case 'mysql':
          qb.orWhereRaw(`MATCH(${searchText.join(',')}) AGAINST(? IN BOOLEAN MODE)`, `*${query}*`);
          break;
        case 'pg': {
          const searchQuery = searchText.map(attribute =>
            _.toLower(attribute) === attribute
              ? `to_tsvector(${attribute})`
              : `to_tsvector('${attribute}')`
          );

          qb.orWhereRaw(`${searchQuery.join(' || ')} @@ to_tsquery(?)`, query);
          break;
        }
      }

      if (filters.sort) {
        qb.orderBy(filters.sort.key, filters.sort.order);
      }

      if (filters.skip) {
        qb.offset(_.toNumber(filters.skip));
      }

      if (filters.limit) {
        qb.limit(_.toNumber(filters.limit));
      }
    }).fetchAll({
      withRelated: populate
    });
  }
};
