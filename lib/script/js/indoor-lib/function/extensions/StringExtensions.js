"use strict";
String.prototype.initWordIndices = function () {
    this._wordIndices = [];
    for (let i = 0; i < this.length; i++) {
        this._wordIndices.push(i);
        if (this.codePointAt(i) > 0xFFFF) {
            i++;
        }
    }
};
String.prototype.getWordIndices = function () {
    if (!this._wordIndices)
        this.initWordIndices();
    return this._wordIndices;
};
String.prototype.getCharCount = function () {
    if (!this._wordIndices)
        this.initWordIndices();
    return this._wordIndices.length;
};
String.prototype.charIndexOf = function (charIndex) {
    if (!this._wordIndices)
        this.initWordIndices();
    return this[this._wordIndices[charIndex]];
};
String.prototype.charIndexToWordIndex = function (charIndex) {
    if (!this._wordIndices)
        this.initWordIndices();
    return this._wordIndices[charIndex];
};
String.prototype.initCodePoints = function () {
    this._codePoints = [];
    for (let i = 0; i < this.length; i++) {
        let cp = this.codePointAt(i);
        this._codePoints.push(cp);
        if (cp > 0xFFFF) {
            i++;
        }
    }
};
String.prototype.charByIndex = function (charIndex) {
    let char = null;
    if (!this._codePoints)
        this.initCodePoints();
    if (charIndex < this._codePoints.length) {
        char = String.fromCodePoint(this._codePoints[charIndex]);
    }
    return char;
};
String.prototype.codePointCount = function () {
    let arr = this.match(/[\s\S]/gu);
    return arr ? arr.length : 0;
};
//# sourceMappingURL=StringExtensions.js.map