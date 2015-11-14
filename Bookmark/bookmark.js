/************************************************************************************
Link-buncher
Bookmark which allows to open multiple links at once.*

installation: create new bookmark, copy and paste this code into bookmark link field.

using:

1. open web page
2. press bookmark with code
3. press and hold Shift
4. move pointer over desirable links(they should get red frame)
5. release Shift
6. to open all selected links at once ckick any of red framed links

*- assuming that popups are allowed for sites you work with in browser settings
************************************************************************************/



javascript: (function() {
    var a = document.querySelectorAll("a[href]");

    var links = [];

    function ahendler(event) {// makes red border for selected links, add link to links array
        if (event.shiftKey) {
            var elIndex = links.indexOf(this);
            if (elIndex === -1) {
                links.push(this);
                this.originalStyle = this.style.cssText;
                this.style.border = "1px solid red";
                this.addEventListener("click", opener, false);
            } else {// on even mouseover for the same link undo style changes, removes from links array
                links.splice(elIndex, 1);
                this.style.cssText = this.originalStyle;
                this.removeEventListener("click", opener, false);
            }
        }
    }

    function opener(event) { // after clicking any red framed links opens all links in separate windows, remove all styles and event listener
        event.preventDefault();
        for (var i = 0, l = links.length; i < l; i++) {
            links[i].style.cssText = links[i].originalStyle;
            links[i].removeEventListener("click", opener, false);
            window.open(links[i].href, '_blank');
        }
        links = [];
        return false;
    }

    for (var i = 0, l = a.length; i < l; i++) {
        a[i].addEventListener("mouseover", ahendler, true)
    }
})();