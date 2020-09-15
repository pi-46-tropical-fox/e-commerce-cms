const slugify = require('slugify');

const toSlug = string => {
	return slugify(string, {
		replacement: '-', // replace spaces with replacement character, defaults to `-`
		lower: true, // convert to lower case, defaults to `false`
		strict: false, // strip special characters except replacement, defaults to `false`
	});
};

module.exports = { toSlug };
