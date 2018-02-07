$(function () {


    var data = {
        catsId: 0,
        catsPictures: ['img/luis.jpg', 'img/marc.jpg', 'img/tony.jpg', 'img/willy.jpg', 'img/sparkle.jpg'],
        catsNames: ['luis', 'marc', 'tony', 'willy', 'sparkle'],
        counter: [{
            catTaper: 0
        }, {
            catTaper: 0
        }, {
            catTaper: 0
        }, {
            catTaper: 0
        }, {
            catTaper: 0
        }]
    };

    var octopus = {
        init: function () {
            view.init();
        },
        createdButton: function () {
            view.sidebar.innerHTML = data.catsNames.map(cat => {
                return `<button class="${data.catsId++}">${cat} </button>`;
            }).join('');;
        },
        getImage: function (index) {
            return data.catsPictures[index];
        },
        getName: function (index) {
            return data.catsNames[index];

        },

        changeCatInfo: function (index) {
            view.catPics.src = data.catsPictures[index];
            view.catNames.textContent = data.catsNames[index];
            // view.catTaper.textContent = data.counter = 0;
        },
        increaseCounter: function (index) {
            let clickCounter = data.counter[index];
            view.catTaper.textContent = clickCounter.catTaper++;

        },
        admin: function (object) {

            if (object.style.visibility === "hidden") {
                object.style.visibility = "visible";
            } else {
                object.style.visibility = "hidden";
            }
        },
        extractAndSetAdmin: function (name, url, count, index) {
            if (name === null || name === "") {
                return
            }
            view.catNames.textContent = name;
            if (url === null || url === "") {
                return
            }
            view.catPics.src = url;
            if (count === null || count === "") {
                return
            }
            data.counter[index].catTaper = count;
        }

    };

    var view = {
        init: function () {
            this.sidebar = document.querySelector('.sidebar');
            this.catNames = document.querySelector('.catNames');
            this.catPics = document.querySelector('.catSrc');
            this.catTaper = document.querySelector('.catTaper');

            this.admin = document.querySelector('.admin-mode');
            this.adminInput = document.querySelector('.input-form');
            this.submitButton = document.querySelector(".submit");
            this.canceledButton = document.querySelector(".canceled");

            //get the information from the input field and set it to the cats fields

            this.canceledButton.addEventListener('click', (e) => {
                e.preventDefault();
                octopus.admin(this.adminInput);
            });

            this.adminInput.style.visibility = "hidden";
            this.admin.addEventListener('click', () => {
                octopus.admin(this.adminInput);
            });
            octopus.createdButton();
            this.setData();

        },
        setData: function () {
            this.catPics.src = octopus.getImage(0);
            this.catNames.textContent = octopus.getName(0);
            let lastButtonClick = 0;
            this.button = Array.from(document.querySelectorAll('.sidebar button'));
            this.button.map(btn => btn.addEventListener('click', function () {
                octopus.changeCatInfo(this.className);
                lastButtonClick = this.className;

            }));
            this.catPics.addEventListener('click', function () {
                octopus.increaseCounter(lastButtonClick);
            });
            this.submitButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.name = document.querySelector('.name').value;
                this.url = document.querySelector('.url').value;
                this.count = document.querySelector('.click-number').value;
                     console.log(this.name);
                octopus.extractAndSetAdmin(this.name, this.url, this.count, lastButtonClick);
                octopus.admin(this.adminInput);

            });

        }

    }

    octopus.init();
}());