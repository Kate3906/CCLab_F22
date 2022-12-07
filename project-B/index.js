const btn = document.getElementsByClassName('startbutton');

btn.addEventListener('click', function handleClick() {
    const initialText = 'Start!';

    if (btn.textContent.toLowerCase().includes(initialText.toLowerCase())) {
        btn.textContent = 'Again';
    } else {
        btn.textContent = initialText;
    }
});



function selectLove() {
    localStorage.setItem("choice", "love");
    window.open("index3.html", "_self");
}

function selectStudy() {
    localStorage.setItem("choice", "study");
    window.open("index2.html", "_self");
}
