"use strict";
var CustomBootstrap;
(function (CustomBootstrap) {
    var Dom;
    (function (Dom) {
        Dom.SelectorEngine = {
            find(selector, element = document.documentElement) {
                return [...element.querySelectorAll(selector)];
            },
            findOne(selector, element = document.documentElement) {
                return element.querySelector(selector);
            },
            children(element, selector) {
                return [...element.children].filter(child => child.matches(selector));
            },
            parents(element, selector) {
                const parents = [];
                let ancestor = element.parentElement?.closest(selector);
                while (ancestor) {
                    parents.push(ancestor);
                    ancestor = ancestor.parentElement?.closest(selector);
                }
                return parents;
            },
            ancestors(element, selector) {
                const ancs = [];
                let current = element;
                while ((current = current.parentElement)) {
                    current.matches(selector) && ancs.push(current);
                }
                return ancs;
            },
            prev(element, selector) {
                let previous = element.previousElementSibling;
                while (previous) {
                    if (previous.matches(selector)) {
                        return [previous];
                    }
                    previous = previous.previousElementSibling;
                }
                return [];
            },
            firstPrev(element, selector) {
                let target = null;
                let prev = element;
                while ((prev = prev.previousElementSibling)) {
                    if (prev.matches(selector)) {
                        target = prev;
                        break;
                    }
                }
                return target;
            },
            prevSiblings(element, selector) {
                let targets = [];
                let prev = element;
                while ((prev = prev.previousElementSibling)) {
                    prev.matches(selector) && targets.push(prev);
                }
                return targets;
            },
            next(element, selector) {
                let next = element.nextElementSibling;
                while (next) {
                    if (next.matches(selector)) {
                        return [next];
                    }
                    next = next.nextElementSibling;
                }
                return [];
            },
            firstNext(element, selector) {
                let target = null;
                let next = element;
                while ((next = next.nextElementSibling)) {
                    if (next.matches(selector)) {
                        target = next;
                        break;
                    }
                }
                return target;
            },
            nextSiblings(element, selector) {
                let targets = [];
                let next = element;
                while ((next = next.nextElementSibling)) {
                    next.matches(selector) && targets.push(next);
                }
                return targets;
            },
            focusableChildren(element) {
                const focusables = [
                    'a',
                    'button',
                    'input',
                    'textarea',
                    'select',
                    'details',
                    '[tabindex]',
                    '[contenteditable="true"]'
                ].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
                return this.find(focusables, element).filter(el => !CustomBootstrap.Util.Index.isDisabled(el) && CustomBootstrap.Util.Index.isVisible(el));
            }
        };
    })(Dom = CustomBootstrap.Dom || (CustomBootstrap.Dom = {}));
})(CustomBootstrap || (CustomBootstrap = {}));
//# sourceMappingURL=selector-engine.js.map