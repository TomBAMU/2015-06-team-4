module.exports = function() {
    'use strict';

    this.title = element(by.model('movie.title'));
    this.description = element(by.model('movie.description'));
    this.year = element(by.model('movie.year'));
    this.save = element(by.css('.btn-primary'));

    this.open = function() {
        browser.get('/movies/new');
    };

    this.addMovie = function(title, description, year) {
        this.open();
        this.title.clear();
        this.title.sendKeys(title);
        this.description.clear();
        this.description.sendKeys(description);
        this.year.clear();
        this.year.sendKeys(year);
        this.save.click();
    };
};
