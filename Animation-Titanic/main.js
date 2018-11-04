function boatHit(event) {
    document.getElementsByClassName('wrapper')[0].classList.add('hit');
}

window.addEventListener('load', function (event) {
    let hited = document.getElementById('boat');
    hited.addEventListener('click', boatHit);
});

