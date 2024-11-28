class CategoryFactory {
    static allowedCategories = ['Work', 'Personal', 'Education', null];

    /**
     * Factory method to create a category.
     * @param {string|null} categoryName
     * @returns {string|null} The validated category or throws an error if invalid.
     */
    static createCategory(categoryName) {
        if (!this.allowedCategories.includes(categoryName)) {
            throw new Error('Invalid category. Allowed values are Work, Personal, Education, or null.');
        }
        return categoryName;
    }
}

module.exports = CategoryFactory;
