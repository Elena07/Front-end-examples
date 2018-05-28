/**
 * Created by User on 10.01.2018.
 */

var last_clicked_id = null,
    images = [];

function updatePopup(obj) {
        last_clicked_id = parseInt(obj.parentNode.getAttribute('data-item-id'));

        document.getElementById('popup').classList.add('active');
        var form = document.forms.comments;
        form.elements.name.value = '';
        form.elements.comment.value = '';
        document.getElementsByClassName('bg')[0].classList.add('active-bg');

        document.getElementById('popup-picture').style.backgroundImage = obj.style.backgroundImage;

        var votes = JSON.parse(localStorage.getItem('votes'));
        document.getElementById('like').querySelector('.count-like').innerHTML = typeof votes[last_clicked_id] === 'undefined' ? "0" : votes[last_clicked_id];

        var all_comments = JSON.parse(localStorage.getItem('comments')) || {},
            current_comments = all_comments[last_clicked_id] || [],
            commentsEl = document.getElementsByClassName('comment-history-list')[0];
        commentsEl.innerHTML = '';
        document.getElementById('current_comment_counter').innerText = current_comments.length;

        current_comments.forEach(function (item) {
            var date = new Date(item[2]), curentDate = new Date();
            var node = document.createElement("LI");


            node.innerHTML = `<span class="name">By ${item[0]}</span>


                              <span class="date">${date.toDateString()}</span>
                              <span class="text">${item[1]}</span>`;
            commentsEl.appendChild(node);
        });
}


function pictureClick(event) {
    var obj = event.target;
    if (obj.nodeName === "A") {
        updatePopup(obj);
    }
}

function pictureClose(event) {

    last_clicked_id = null;

    document.getElementById('popup').classList.remove('active');
    document.getElementsByClassName('bg')[0].classList.remove('active-bg');

}


function like() {

    var votes = localStorage.getItem('votes');

    votes = JSON.parse(votes);

    votes[last_clicked_id] = typeof votes[last_clicked_id] === 'undefined' ? 1 : votes[last_clicked_id] + 1;

    document.getElementById('like').querySelector('.count-like').innerHTML = votes[last_clicked_id];
    document.querySelector('[data-item-id="' + last_clicked_id + '"] .count-like').innerHTML = votes[last_clicked_id];

    localStorage.setItem('votes', JSON.stringify(votes));
}

function addImage(e) {
    var div = document.getElementsByClassName('hidden-pic')[0].cloneNode(true);
    var img = new Image();
        img.onload = function (e) {

        };
    img.src = URL.createObjectURL(e.target.files[0]);
    e.target.value = '';

}

function addComment(e) {
    e.preventDefault();
    e.stopPropagation();

    var all_comments = JSON.parse(localStorage.getItem('comments')) || {},
        current_comments = all_comments[last_clicked_id] || [],
        form = document.forms.comments;

    current_comments.push([form.elements.name.value, form.elements.comment.value, new Date()]);
    all_comments[last_clicked_id] = current_comments;
    document.querySelector('[data-item-id="' + last_clicked_id + '"] .count-com').innerHTML = current_comments.length;
    localStorage.setItem('comments', JSON.stringify(all_comments));
    updatePopup(document.querySelector('[data-item-id="' + last_clicked_id + '"]').children[0]);
}

window.addEventListener('load', function () {
    var items = document.getElementsByClassName('pic');
    document.getElementById('image_list').addEventListener('click', pictureClick);

    maxImageId = 0;

    var elem1 = document.getElementById('close');
    elem1.addEventListener('click', pictureClose);

    var elem2 = document.querySelectorAll('.like')[0];
    elem2.addEventListener('click', like);


    if (typeof localStorage.getItem('votes') === 'object') {
        localStorage.setItem('votes', '{}');
    }

    var votes = JSON.parse(localStorage.getItem('votes'));

    document.getElementById("submit").addEventListener('click', addComment);
    let el;
    for(var i in votes) {
        el = document.querySelector('[data-item-id="' + i + '"] .count-like');
        if (el)
            el.innerHTML = votes[i];
    }

    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    for(var i in comments) {
        el = document.querySelector('[data-item-id="' + i + '"] .count-com');
        if (el)
            el.innerHTML = comments[i].length;
    }


});




