"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const axios = require("axios");

async function getGameInfo(slug) {
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const body = await axios.get(`https://gog.com/game/${slug}`);
  const dom = new JSDOM(body.data);

  const description = dom.window.document.querySelector(".description");
  return {
    hating: "BR0",
    short_description: description.textContent.slice(0, 160),
    description: description.innerHTML,
  };
}

module.exports = {
  populate: async (ctx) => {
    const gogApiUrl = `https://www.gog.com/games/ajax/filtered?mediaType=game&page=1&sort=popularity`;

    const {
      data: { products },
    } = await axios.get(gogApiUrl);

    console.log(await getGameInfo(products[0].slug));
  },
};
