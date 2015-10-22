/************************************************************************************
a-bunch - script lets you open multiple links at once.*
installation: create new bookmark, copy and paste this code into bookmark link field.
using:
1. open web page
2. press bookmark with code
3. simultaneously press and hold alt+Shift
4. move pointer over desirable links(they should get red frame)
5. release buttons from step 3.

* assuming that popups are allowed for sites you work with in browser settings
************************************************************************************/

var a = document.querySelectorAll("a[href]");
var b = document.getElementsByTagName("body");

var links = [];

function ahendler(event) {
    if (event.shiftKey && event.altKey) {
        links.push(this);
        this.originalStyle = this.style.cssText;
        this.style.border = "1px solid red";
        this.removeEventListener("mouseover", ahendler, true);
    }
}

function opener(event) {
    if (event.keyCode === 16 && event.altKey) {
        for (var i = 0, l = links.length; i < l; i++) {
            links[i].style = links[i].originalStyle;
            window.open(links[i].href, '_blank');
        }
    }
    //this.removeEventListener("keyup",opener,true);
}

for (var i = 0, l = a.length; i < l; i++) {
    a[i].addEventListener("mouseover", ahendler, true)
}
b[0].addEventListener("keyup", opener, true);